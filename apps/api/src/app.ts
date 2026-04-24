import Fastify from "fastify";
import type { AuthProvider } from "./auth/provider.js";
import { buildAuthMiddleware } from "./auth/middleware.js";
import { TestAuthProvider } from "./auth/test-provider.js";

export interface AppOptions {
  authProvider?: AuthProvider;
}

export function buildApp(options: AppOptions = {}) {
  const app = Fastify();
  const authProvider = options.authProvider ?? new TestAuthProvider();
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

  return app;
}
