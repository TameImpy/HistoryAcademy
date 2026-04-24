import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("courses API", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("GET /courses", () => {
    it("returns list of published courses", async () => {
      const response = await app.inject({ method: "GET", url: "/courses" });

      expect(response.statusCode).toBe(200);
      const courses = response.json();
      expect(courses).toHaveLength(2);
      expect(courses[0]).toHaveProperty("slug", "tudor-dynasty");
      expect(courses[0]).toHaveProperty("title", "The Tudor Dynasty");
      expect(courses[0]).not.toHaveProperty("modules");
    });
  });

  describe("GET /courses/:slug", () => {
    it("returns full course with modules and lessons", async () => {
      const response = await app.inject({ method: "GET", url: "/courses/tudor-dynasty" });

      expect(response.statusCode).toBe(200);
      const course = response.json();
      expect(course.slug).toBe("tudor-dynasty");
      expect(course.modules).toHaveLength(1);
      expect(course.modules[0].lessons).toHaveLength(2);
      expect(course.modules[0].quiz.questions).toHaveLength(1);
    });

    it("returns 404 for non-existent course", async () => {
      const response = await app.inject({ method: "GET", url: "/courses/non-existent" });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({ error: "Course not found" });
    });
  });

  describe("GET /courses/:slug/reading-list", () => {
    it("returns reading list items for a course", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/courses/tudor-dynasty/reading-list",
      });

      expect(response.statusCode).toBe(200);
      const items = response.json();
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveProperty("title", "The Tudors");
      expect(items[0]).toHaveProperty("author", "Peter Ackroyd");
    });

    it("returns empty array when no reading list", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/courses/roman-britain/reading-list",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual([]);
    });
  });
});
