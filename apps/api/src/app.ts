import Fastify from "fastify";
import type { AuthProvider } from "./auth/provider.js";
import { buildAuthMiddleware } from "./auth/middleware.js";
import { TestAuthProvider } from "./auth/test-provider.js";
import type { ContentProvider } from "./content/provider.js";
import { TestContentProvider } from "./content/test-provider.js";
import { registerContentRoutes } from "./content/routes.js";
import { registerQuizRoutes } from "./content/quiz-routes.js";
import { registerReadingListRoutes } from "./content/reading-list-routes.js";
import type { SubscriptionProvider } from "./subscription/provider.js";
import { TestSubscriptionProvider } from "./subscription/test-provider.js";
import { registerSubscriptionRoutes } from "./subscription/routes.js";
import type { ProgressProvider } from "./progress/provider.js";
import { TestProgressProvider } from "./progress/test-provider.js";
import { registerProgressRoutes } from "./progress/routes.js";
import type { CertificateProvider } from "./certificate/provider.js";
import { TestCertificateProvider } from "./certificate/test-provider.js";
import { registerCertificateRoutes } from "./certificate/routes.js";
import type { LLMProvider } from "./ai-tutor/llm-provider.js";
import { TestLLMProvider } from "./ai-tutor/test-llm-provider.js";
import type { RetrievalProvider } from "./ai-tutor/retrieval-provider.js";
import { TestRetrievalProvider } from "./ai-tutor/test-retrieval-provider.js";
import { registerAITutorRoutes } from "./ai-tutor/routes.js";

export interface AppOptions {
  authProvider?: AuthProvider;
  contentProvider?: ContentProvider;
  subscriptionProvider?: SubscriptionProvider;
  progressProvider?: ProgressProvider;
  certificateProvider?: CertificateProvider;
  llmProvider?: LLMProvider;
  retrievalProvider?: RetrievalProvider;
}

export function buildApp(options: AppOptions = {}) {
  const app = Fastify();
  const authProvider = options.authProvider ?? new TestAuthProvider();
  const contentProvider = options.contentProvider ?? new TestContentProvider();
  const subscriptionProvider = options.subscriptionProvider ?? new TestSubscriptionProvider();
  const progressProvider = options.progressProvider ?? new TestProgressProvider();
  const certificateProvider = options.certificateProvider ?? new TestCertificateProvider();
  const llmProvider = options.llmProvider ?? new TestLLMProvider();
  const retrievalProvider = options.retrievalProvider ?? new TestRetrievalProvider();
  const authenticate = buildAuthMiddleware(authProvider);

  app.get("/health", async () => {
    return { status: "ok" };
  });

  app.get("/me", { preHandler: authenticate }, async (request) => {
    return {
      id: request.user!.userId,
      email: request.user!.email,
    };
  });

  registerContentRoutes(app, contentProvider);
  registerQuizRoutes(app, contentProvider, authProvider);
  registerSubscriptionRoutes(app, authProvider, contentProvider, subscriptionProvider);
  registerProgressRoutes(app, authProvider, progressProvider);
  registerCertificateRoutes(app, authProvider, contentProvider, certificateProvider);
  registerReadingListRoutes(app, authProvider);
  registerAITutorRoutes(app, authProvider, llmProvider, retrievalProvider);

  return app;
}
