import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("pre-launch hardening checks (Issue #19)", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("API response times", () => {
    it("GET /health responds in under 50ms", async () => {
      const start = Date.now();
      const response = await app.inject({ method: "GET", url: "/health" });
      const elapsed = Date.now() - start;

      expect(response.statusCode).toBe(200);
      expect(elapsed).toBeLessThan(50);
    });

    it("GET /courses responds in under 500ms", async () => {
      const start = Date.now();
      const response = await app.inject({ method: "GET", url: "/courses" });
      const elapsed = Date.now() - start;

      expect(response.statusCode).toBe(200);
      expect(elapsed).toBeLessThan(500);
    });
  });

  describe("security", () => {
    it("protected endpoints return 401 without auth", async () => {
      const protectedEndpoints = [
        { method: "GET" as const, url: "/me" },
        { method: "GET" as const, url: "/subscription" },
        { method: "POST" as const, url: "/subscription/cancel" },
        { method: "GET" as const, url: "/certificates" },
        { method: "GET" as const, url: "/progress/streak" },
        { method: "POST" as const, url: "/tutor/ask" },
      ];

      for (const endpoint of protectedEndpoints) {
        const response = await app.inject(endpoint);
        expect(response.statusCode).toBe(401);
      }
    });

    it("public endpoints are accessible without auth", async () => {
      const publicEndpoints = [
        { method: "GET" as const, url: "/health" },
        { method: "GET" as const, url: "/courses" },
        { method: "GET" as const, url: "/courses/tudor-dynasty" },
      ];

      for (const endpoint of publicEndpoints) {
        const response = await app.inject(endpoint);
        expect(response.statusCode).toBe(200);
      }
    });
  });

  describe("content integrity", () => {
    it("all 6 courses are accessible", async () => {
      const slugs = [
        "tudor-dynasty",
        "roman-britain",
        "wwii-home-front",
        "medieval-england",
        "victorian-age",
        "english-civil-war",
      ];

      for (const slug of slugs) {
        const response = await app.inject({ method: "GET", url: `/courses/${slug}` });
        expect(response.statusCode).toBe(200);
        const course = response.json();
        expect(course.modules.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("every module has a quiz with 3+ questions", async () => {
      const response = await app.inject({ method: "GET", url: "/courses/tudor-dynasty" });
      const course = response.json();

      for (const mod of course.modules) {
        expect(mod.quiz).toBeDefined();
        expect(mod.quiz.questions.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("every course has a reading list with 5+ items", async () => {
      const slugs = ["tudor-dynasty", "roman-britain", "medieval-england"];

      for (const slug of slugs) {
        const response = await app.inject({
          method: "GET",
          url: `/courses/${slug}/reading-list`,
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().length).toBeGreaterThanOrEqual(5);
      }
    });
  });
});
