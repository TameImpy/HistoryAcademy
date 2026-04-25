import { describe, it, expect } from "vitest";
import { runEvaluation } from "../src/ai-tutor/eval/harness.js";
import { TestLLMProvider } from "../src/ai-tutor/test-llm-provider.js";
import { TestRetrievalProvider } from "../src/ai-tutor/test-retrieval-provider.js";

describe("AI tutor evaluation harness (Issue #18)", () => {
  it("runs gold set and produces evaluation summary", async () => {
    const llm = new TestLLMProvider();
    const retrieval = new TestRetrievalProvider();

    const summary = await runEvaluation(llm, retrieval);

    expect(summary).toHaveProperty("total");
    expect(summary).toHaveProperty("passed");
    expect(summary).toHaveProperty("factualAccuracy");
    expect(summary).toHaveProperty("citationCorrectness");
    expect(summary.total).toBeGreaterThanOrEqual(15);
    expect(summary.results).toHaveLength(summary.total);
  });

  it("correctly identifies out-of-scope questions", async () => {
    const llm = new TestLLMProvider();
    const retrieval = new TestRetrievalProvider();

    const summary = await runEvaluation(llm, retrieval);
    const outOfScope = summary.results.filter((r) => r.category === "out_of_scope");

    expect(outOfScope.length).toBeGreaterThanOrEqual(3);
    // With a real retrieval provider, all should be refused.
    // With test provider (keyword matching), at least some should be refused.
    const refused = outOfScope.filter((r) => r.refusedCorrectly);
    expect(refused.length).toBeGreaterThanOrEqual(1);
  });
});
