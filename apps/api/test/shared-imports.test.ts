import { describe, it, expect } from "vitest";
import { APP_NAME, type HealthResponse } from "@history-academy/shared";

describe("shared package", () => {
  it("exports APP_NAME constant", () => {
    expect(APP_NAME).toBe("HistoryExtra Academy");
  });

  it("exports HealthResponse type that matches API response shape", () => {
    const response: HealthResponse = { status: "ok" };
    expect(response.status).toBe("ok");
  });
});
