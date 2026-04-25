import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("quiz API", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("GET /courses/:slug/modules/:moduleId/quiz", () => {
    it("returns quiz questions for a module", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/courses/tudor-dynasty/modules/mod_1_1/quiz",
      });
      expect(response.statusCode).toBe(200);
      const quiz = response.json();
      expect(quiz).toHaveProperty("id");
      expect(quiz.questions.length).toBeGreaterThanOrEqual(3);
      // MCQ questions should NOT include correctIndex in response
      const mcq = quiz.questions.find((q: { type: string }) => q.type === "mcq");
      expect(mcq).toBeDefined();
      expect(mcq).not.toHaveProperty("correctIndex");
    });

    it("returns 404 for module without quiz", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/courses/tudor-dynasty/modules/nonexistent/quiz",
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /courses/:slug/modules/:moduleId/quiz/submit", () => {
    it("scores MCQ answers correctly", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/courses/tudor-dynasty/modules/mod_1_1/quiz/submit",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: {
          answers: [
            { questionId: "q_1_1_1", selectedIndex: 1 }, // correct
            { questionId: "q_1_1_2", selectedIndex: 0 }, // wrong
          ],
        },
      });
      expect(response.statusCode).toBe(200);
      const result = response.json();
      expect(result).toHaveProperty("score");
      expect(result).toHaveProperty("results");
      expect(result.results[0].correct).toBe(true);
      expect(result.results[1].correct).toBe(false);
    });
  });
});
