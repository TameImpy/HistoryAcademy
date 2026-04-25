import type { FastifyInstance, FastifyRequest } from "fastify";
import type { ContentProvider } from "./provider.js";
import type { AuthProvider } from "../auth/provider.js";
import { buildAuthMiddleware } from "../auth/middleware.js";

type QuizAnswer = { questionId: string; selectedIndex?: number; answer?: string };

export function registerQuizRoutes(
  app: FastifyInstance,
  contentProvider: ContentProvider,
  authProvider: AuthProvider,
) {
  const authenticate = buildAuthMiddleware(authProvider);

  // Get quiz (without answers)
  app.get<{ Params: { slug: string; moduleId: string } }>(
    "/courses/:slug/modules/:moduleId/quiz",
    async (request: FastifyRequest<{ Params: { slug: string; moduleId: string } }>, reply) => {
      const { slug, moduleId } = request.params;
      const course = await contentProvider.getCourse(slug);
      if (!course) return reply.status(404).send({ error: "Course not found" });

      const mod = course.modules.find((m) => m.id === moduleId);
      if (!mod?.quiz) return reply.status(404).send({ error: "Quiz not found" });

      // Strip correct answers from response
      const safeQuestions = mod.quiz.questions.map((q) => {
        if (q.type === "mcq") {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { correctIndex, ...rest } = q;
          return rest;
        }
        if (q.type === "short-answer") {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { modelAnswer, ...rest } = q;
          return rest;
        }
        return q;
      });

      return { id: mod.quiz.id, questions: safeQuestions };
    },
  );

  // Submit quiz answers
  app.post<{ Params: { slug: string; moduleId: string }; Body: { answers: QuizAnswer[] } }>(
    "/courses/:slug/modules/:moduleId/quiz/submit",
    { preHandler: authenticate },
    async (
      request: FastifyRequest<{
        Params: { slug: string; moduleId: string };
        Body: { answers: QuizAnswer[] };
      }>,
      reply,
    ) => {
      const { slug, moduleId } = request.params;
      const course = await contentProvider.getCourse(slug);
      if (!course) return reply.status(404).send({ error: "Course not found" });

      const mod = course.modules.find((m) => m.id === moduleId);
      if (!mod?.quiz) return reply.status(404).send({ error: "Quiz not found" });

      const { answers } = request.body;
      let correctCount = 0;

      const results = answers.map((answer) => {
        const question = mod.quiz!.questions.find((q) => q.id === answer.questionId);
        if (!question) return { questionId: answer.questionId, correct: false };

        if (question.type === "mcq") {
          const isCorrect = answer.selectedIndex === question.correctIndex;
          if (isCorrect) correctCount++;
          return {
            questionId: answer.questionId,
            correct: isCorrect,
            correctIndex: question.correctIndex,
          };
        }

        // Short answer — return model answer for comparison
        return {
          questionId: answer.questionId,
          correct: true, // auto-pass short answers for now
          modelAnswer: question.modelAnswer,
        };
      });

      return {
        score: Math.round((correctCount / answers.length) * 100),
        results,
      };
    },
  );
}
