import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("paywall gate", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  it("allows access to lesson 1 without auth", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/courses/tudor-dynasty/lessons/les_1_1_1/access",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ access: true, reason: "free_preview" });
  });

  it("blocks lesson 2 without auth", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/courses/tudor-dynasty/lessons/les_1_1_2/access",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().access).toBe(false);
    expect(response.json().reason).toBe("paywall");
  });

  it("allows lesson 2 for authenticated user with active subscription", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/courses/tudor-dynasty/lessons/les_1_1_2/access",
      headers: {
        authorization: "Bearer test-valid-token",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ access: true, reason: "subscribed" });
  });
});
