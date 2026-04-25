import type { FastifyInstance } from "fastify";
import type { FastifyRequest } from "fastify";
import { buildAuthMiddleware } from "../auth/middleware.js";
import type { AuthProvider } from "../auth/provider.js";
import type { ProgressProvider } from "./provider.js";

export function registerProgressRoutes(
  app: FastifyInstance,
  authProvider: AuthProvider,
  progressProvider: ProgressProvider,
) {
  const authenticate = buildAuthMiddleware(authProvider);

  app.post<{
    Body: { lessonId: string; courseSlug: string; playbackPositionSeconds: number };
  }>("/progress", { preHandler: authenticate }, async (request) => {
    const { lessonId, courseSlug, playbackPositionSeconds } = request.body;
    return progressProvider.saveProgress(
      request.user!.userId,
      lessonId,
      courseSlug,
      playbackPositionSeconds,
    );
  });

  app.get("/progress/streak", { preHandler: authenticate }, async (request) => {
    return progressProvider.getStreak(request.user!.userId);
  });

  app.get("/progress/continue", { preHandler: authenticate }, async (request) => {
    const result = await progressProvider.getContinueLearning(request.user!.userId);
    return result ?? { message: "No courses started" };
  });

  app.get<{ Params: { courseSlug: string } }>(
    "/progress/:courseSlug",
    { preHandler: authenticate },
    async (request: FastifyRequest<{ Params: { courseSlug: string } }>) => {
      return progressProvider.getCourseProgress(request.user!.userId, request.params.courseSlug);
    },
  );
}
