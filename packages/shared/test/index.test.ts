import { describe, it, expect } from "vitest";
import { APP_NAME } from "../src/index.js";

describe("shared exports", () => {
  it("exports APP_NAME", () => {
    expect(APP_NAME).toBe("HistoryExtra Academy");
  });
});
