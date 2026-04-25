import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("progress API", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("POST /progress", () => {
    it("returns 401 without auth", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/progress",
        payload: {
          lessonId: "les_1_1_1",
          courseSlug: "tudor-dynasty",
          playbackPositionSeconds: 120,
        },
      });
      expect(response.statusCode).toBe(401);
    });

    it("saves lesson progress for authenticated user", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/progress",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: {
          lessonId: "les_1_1_1",
          courseSlug: "tudor-dynasty",
          playbackPositionSeconds: 120,
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("status");
    });
  });

  describe("GET /progress/:courseSlug", () => {
    it("returns course progress for authenticated user", async () => {
      // First save some progress
      await app.inject({
        method: "POST",
        url: "/progress",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: {
          lessonId: "les_1_1_1",
          courseSlug: "tudor-dynasty",
          playbackPositionSeconds: 600,
        },
      });

      const response = await app.inject({
        method: "GET",
        url: "/progress/tudor-dynasty",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("completionPercent");
      expect(response.json()).toHaveProperty("lessonsCompleted");
    });
  });

  describe("GET /progress/streak", () => {
    it("returns streak info for authenticated user", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/progress/streak",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("currentStreak");
    });
  });

  describe("GET /progress/continue", () => {
    it("returns last active course for authenticated user", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/progress/continue",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
