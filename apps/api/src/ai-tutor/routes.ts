import type { FastifyInstance } from "fastify";
import { buildAuthMiddleware } from "../auth/middleware.js";
import type { AuthProvider } from "../auth/provider.js";
import type { LLMProvider } from "./llm-provider.js";
import type { RetrievalProvider } from "./retrieval-provider.js";
import type { TutorSession, TutorFeedback } from "@history-academy/shared";

const sessions = new Map<string, TutorSession>();
const feedbackStore: TutorFeedback[] = [];
const MESSAGE_LIMIT = 50;

export function registerAITutorRoutes(
  app: FastifyInstance,
  authProvider: AuthProvider,
  llmProvider: LLMProvider,
  retrievalProvider: RetrievalProvider,
) {
  const authenticate = buildAuthMiddleware(authProvider);

  // Ask the AI tutor a question
  app.post<{ Body: { question: string; courseSlug: string; sessionId?: string } }>(
    "/tutor/ask",
    { preHandler: authenticate },
    async (request, reply) => {
      const { question, courseSlug, sessionId } = request.body;
      const userId = request.user!.userId;

      // Check message limit
      let session: TutorSession;
      if (sessionId && sessions.has(sessionId)) {
        session = sessions.get(sessionId)!;
        if (session.messageCount >= MESSAGE_LIMIT) {
          return reply.status(429).send({
            error: "Monthly message limit reached",
            limit: MESSAGE_LIMIT,
          });
        }
      } else {
        session = {
          sessionId: `session_${userId}_${Date.now()}`,
          courseSlug,
          messages: [],
          messageCount: 0,
        };
      }

      // Retrieve relevant documents
      const docs = await retrievalProvider.search(question, courseSlug, 5);
      const context = docs.map((d) => d.chunk);

      // Generate response
      const systemPrompt = `You are a history tutor for the ${courseSlug} course. Only answer based on provided sources. Cite your sources.`;
      const response = await llmProvider.generateResponse(question, context, systemPrompt);

      // Guardrail: refuse if confidence too low
      if (response.confidence < 0.5 && response.citations.length === 0) {
        const refusalMessage = {
          role: "assistant" as const,
          content:
            "I'm not confident enough to answer that question based on the course materials. Could you try rephrasing, or ask about a topic covered in your course?",
          citations: [],
          confidence: response.confidence,
        };
        session.messages.push({ role: "user", content: question }, refusalMessage);
        session.messageCount += 2;
        sessions.set(session.sessionId, session);

        return {
          sessionId: session.sessionId,
          response: refusalMessage,
        };
      }

      const assistantMessage = {
        role: "assistant" as const,
        content: response.content,
        citations: response.citations,
        confidence: response.confidence,
      };

      session.messages.push({ role: "user", content: question }, assistantMessage);
      session.messageCount += 2;
      sessions.set(session.sessionId, session);

      return {
        sessionId: session.sessionId,
        response: assistantMessage,
      };
    },
  );

  // Submit feedback on a tutor response
  app.post<{ Body: TutorFeedback }>(
    "/tutor/feedback",
    { preHandler: authenticate },
    async (request) => {
      feedbackStore.push(request.body);
      return { recorded: true };
    },
  );

  // Admin: get feedback log
  app.get("/admin/tutor/feedback", { preHandler: authenticate }, async () => {
    return { feedback: feedbackStore, total: feedbackStore.length };
  });

  // Admin: get conversation by session
  app.get<{ Params: { sessionId: string } }>(
    "/admin/tutor/sessions/:sessionId",
    { preHandler: authenticate },
    async (request, reply) => {
      const session = sessions.get(request.params.sessionId);
      if (!session) return reply.status(404).send({ error: "Session not found" });
      return session;
    },
  );
}
