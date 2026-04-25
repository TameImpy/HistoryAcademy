import type { FastifyInstance } from "fastify";
import { buildAuthMiddleware } from "../auth/middleware.js";
import type { AuthProvider } from "../auth/provider.js";
import type { ContentProvider } from "../content/provider.js";
import type { CertificateProvider } from "./provider.js";

export function registerCertificateRoutes(
  app: FastifyInstance,
  authProvider: AuthProvider,
  contentProvider: ContentProvider,
  certificateProvider: CertificateProvider,
) {
  const authenticate = buildAuthMiddleware(authProvider);

  app.get("/certificates", { preHandler: authenticate }, async (request) => {
    return certificateProvider.listCertificates(request.user!.userId);
  });

  app.post<{ Body: { courseSlug: string } }>(
    "/certificates/generate",
    { preHandler: authenticate },
    async (request, reply) => {
      const { courseSlug } = request.body;
      const course = await contentProvider.getCourse(courseSlug);
      if (!course) return reply.status(404).send({ error: "Course not found" });

      return certificateProvider.generateCertificate(
        request.user!.userId,
        courseSlug,
        course.title,
        course.instructor,
        request.user!.email,
      );
    },
  );
}
