import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("subscription API", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  describe("GET /subscription", () => {
    it("returns 401 without auth", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/subscription",
      });
      expect(response.statusCode).toBe(401);
    });

    it("returns subscription status for authenticated user", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/subscription",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("status");
    });
  });

  describe("POST /subscription/cancel", () => {
    it("returns 401 without auth", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/subscription/cancel",
      });
      expect(response.statusCode).toBe(401);
    });

    it("cancels subscription for authenticated user", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/subscription/cancel",
        headers: { authorization: "Bearer test-valid-token" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("status", "cancelled");
    });
  });

  describe("POST /subscription/checkout", () => {
    it("returns checkout URL for monthly plan", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/subscription/checkout",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: { plan: "monthly" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("checkoutUrl");
    });

    it("returns checkout URL for annual plan", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/subscription/checkout",
        headers: {
          authorization: "Bearer test-valid-token",
          "content-type": "application/json",
        },
        payload: { plan: "annual" },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty("checkoutUrl");
    });
  });
});
