import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("auth middleware", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  it("returns 401 on protected route without auth header", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/me",
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({ error: "Authentication required" });
  });

  it("returns 401 with invalid token", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/me",
      headers: {
        authorization: "Bearer invalid-token",
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({ error: "Invalid token" });
  });

  it("returns user data with valid token", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/me",
      headers: {
        authorization: "Bearer test-valid-token",
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("email");
  });
});
