import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("AI tutor API (Issues #14, #15)", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("POST /tutor/ask", () => {
    it("returns 401 without auth", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/tutor/ask",
        payload: { question: "When was Bosworth?", courseSlug: "tudor-dynasty" },
      });
      expect(response.statusCode).toBe(401);
    });

    it("returns a cited response for a relevant question", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/tutor/ask",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: { question: "When was Bosworth?", courseSlug: "tudor-dynasty" },
      });
      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body).toHaveProperty("sessionId");
      expect(body.response).toHaveProperty("content");
      expect(body.response.citations.length).toBeGreaterThan(0);
      expect(body.response.confidence).toBeGreaterThan(0.5);
    });

    it("gracefully refuses when retrieval confidence is low", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/tutor/ask",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: {
          question: "xyzzy zzzzz nonsense query",
          courseSlug: "tudor-dynasty",
        },
      });
      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.response.content).toContain("not confident");
    });
  });

  describe("POST /tutor/feedback", () => {
    it("records thumbs up/down feedback", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/tutor/feedback",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: {
          sessionId: "session_test",
          messageIndex: 1,
          rating: "thumbs_up",
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ recorded: true });
    });
  });

  describe("GET /admin/tutor/feedback", () => {
    it("returns feedback log", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/admin/tutor/feedback",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("feedback");
    });
  });
});
