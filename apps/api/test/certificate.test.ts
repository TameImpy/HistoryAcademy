import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("certificate API", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("GET /certificates", () => {
    it("returns 401 without auth", async () => {
      const response = await app.inject({ method: "GET", url: "/certificates" });
      expect(response.statusCode).toBe(401);
    });

    it("returns list of certificates for authenticated user", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/certificates",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.json())).toBe(true);
    });
  });

  describe("POST /certificates/generate", () => {
    it("generates a certificate for completed course", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/certificates/generate",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: { courseSlug: "tudor-dynasty" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("certificateId");
      expect(response.json()).toHaveProperty("downloadUrl");
    });
  });
});
