import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import type { FastifyInstance } from "fastify";

describe("reading list affiliate tracking (Issue #13)", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  it("POST /reading-list/click logs affiliate click", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/reading-list/click",
      headers: {
        authorization: "Bearer test-valid-token",
        "content-type": "application/json",
      },
      payload: {
        bookId: "book_1_1",
        platform: "bookshop",
        courseSlug: "tudor-dynasty",
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ logged: true });
  });

  it("GET /admin/reading-list/clicks returns click analytics", async () => {
    // Log a click first
    await app.inject({
      method: "POST",
      url: "/reading-list/click",
      headers: {
        authorization: "Bearer test-valid-token",
        "content-type": "application/json",
      },
      payload: { bookId: "book_1_1", platform: "bookshop", courseSlug: "tudor-dynasty" },
    });

    const response = await app.inject({
      method: "GET",
      url: "/admin/reading-list/clicks",
      headers: { authorization: "Bearer test-valid-token" },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("clicks");
  });
});
