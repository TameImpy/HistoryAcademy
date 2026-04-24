import type { FastifyInstance } from "fastify";
import type { ContentProvider } from "./provider.js";

export function registerContentRoutes(app: FastifyInstance, content: ContentProvider) {
  app.get("/courses", async () => {
    return content.listCourses();
  });

  app.get<{ Params: { slug: string } }>("/courses/:slug", async (request, reply) => {
    const course = await content.getCourse(request.params.slug);
    if (!course) {
      return reply.status(404).send({ error: "Course not found" });
    }
    return course;
  });

  app.get<{ Params: { slug: string } }>("/courses/:slug/reading-list", async (request) => {
    return content.getReadingList(request.params.slug);
  });
}
