import type { FastifyInstance } from "fastify";
import { buildAuthMiddleware } from "../auth/middleware.js";
import type { AuthProvider } from "../auth/provider.js";

interface ClickLog {
  userId: string;
  bookId: string;
  platform: string;
  courseSlug: string;
  timestamp: string;
}

const clickStore: ClickLog[] = [];

export function registerReadingListRoutes(app: FastifyInstance, authProvider: AuthProvider) {
  const authenticate = buildAuthMiddleware(authProvider);

  app.post<{ Body: { bookId: string; platform: string; courseSlug: string } }>(
    "/reading-list/click",
    { preHandler: authenticate },
    async (request) => {
      const { bookId, platform, courseSlug } = request.body;
      clickStore.push({
        userId: request.user!.userId,
        bookId,
        platform,
        courseSlug,
        timestamp: new Date().toISOString(),
      });
      return { logged: true };
    },
  );

  app.get("/admin/reading-list/clicks", { preHandler: authenticate }, async () => {
    return { clicks: clickStore, total: clickStore.length };
  });
}
