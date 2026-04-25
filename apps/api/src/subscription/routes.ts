import type { FastifyInstance, FastifyRequest } from "fastify";
import type { AuthProvider } from "../auth/provider.js";
import { buildAuthMiddleware } from "../auth/middleware.js";
import type { ContentProvider } from "../content/provider.js";
import type { SubscriptionProvider } from "./provider.js";

export function registerSubscriptionRoutes(
  app: FastifyInstance,
  authProvider: AuthProvider,
  contentProvider: ContentProvider,
  subscriptionProvider: SubscriptionProvider,
) {
  const authenticate = buildAuthMiddleware(authProvider);

  // Get current subscription status
  app.get("/subscription", { preHandler: authenticate }, async (request) => {
    return subscriptionProvider.getSubscription(request.user!.userId);
  });

  // Cancel subscription
  app.post("/subscription/cancel", { preHandler: authenticate }, async (request) => {
    return subscriptionProvider.cancelSubscription(request.user!.userId);
  });

  // Create checkout session
  app.post<{ Body: { plan: "monthly" | "annual" } }>(
    "/subscription/checkout",
    { preHandler: authenticate },
    async (request) => {
      const { plan } = request.body;
      const checkoutUrl = await subscriptionProvider.createCheckoutUrl(request.user!.userId, plan);
      return { checkoutUrl };
    },
  );

  app.get<{ Params: { slug: string; lessonId: string } }>(
    "/courses/:slug/lessons/:lessonId/access",
    async (request: FastifyRequest<{ Params: { slug: string; lessonId: string } }>, reply) => {
      const { slug, lessonId } = request.params;

      // Find the lesson and its position in the course
      const course = await contentProvider.getCourse(slug);
      if (!course) {
        return reply.status(404).send({ error: "Course not found" });
      }

      let lessonIndex = -1;
      let position = 0;
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          if (lesson.id === lessonId) {
            lessonIndex = position;
            break;
          }
          position++;
        }
        if (lessonIndex >= 0) break;
      }

      if (lessonIndex < 0) {
        return reply.status(404).send({ error: "Lesson not found" });
      }

      // Lesson 1 (index 0) is always free
      if (lessonIndex === 0) {
        return { access: true, reason: "free_preview" };
      }

      // Check auth
      const header = request.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
        return { access: false, reason: "paywall" };
      }

      const token = header.slice(7);
      const payload = await authProvider.verifyToken(token);
      if (!payload) {
        return { access: false, reason: "paywall" };
      }

      // Check subscription
      const sub = await subscriptionProvider.getSubscription(payload.userId);
      if (sub.status === "active" || sub.status === "trialing") {
        return { access: true, reason: "subscribed" };
      }

      return { access: false, reason: "paywall" };
    },
  );
}
