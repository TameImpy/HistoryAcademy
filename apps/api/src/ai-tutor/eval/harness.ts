import type { LLMProvider } from "../llm-provider.js";
import type { RetrievalProvider } from "../retrieval-provider.js";
import { GOLD_SET, type GoldSetQuestion } from "./gold-set.js";

export interface EvalResult {
  question: string;
  category: string;
  passed: boolean;
  factualAccuracy: number;
  hasCitations: boolean;
  refusedCorrectly?: boolean;
  details: string;
}

export interface EvalSummary {
  total: number;
  passed: number;
  failed: number;
  factualAccuracy: number;
  citationCorrectness: number;
  results: EvalResult[];
}

export async function runEvaluation(
  llmProvider: LLMProvider,
  retrievalProvider: RetrievalProvider,
): Promise<EvalSummary> {
  const results: EvalResult[] = [];

  for (const q of GOLD_SET) {
    const result = await evaluateQuestion(q, llmProvider, retrievalProvider);
    results.push(result);
  }

  const passed = results.filter((r) => r.passed).length;
  const withCitations = results.filter((r) => !r.refusedCorrectly);
  const citationCorrect = withCitations.filter((r) => r.hasCitations).length;

  return {
    total: results.length,
    passed,
    failed: results.length - passed,
    factualAccuracy: Math.round((passed / results.length) * 100),
    citationCorrectness:
      withCitations.length > 0 ? Math.round((citationCorrect / withCitations.length) * 100) : 100,
    results,
  };
}

async function evaluateQuestion(
  q: GoldSetQuestion,
  llmProvider: LLMProvider,
  retrievalProvider: RetrievalProvider,
): Promise<EvalResult> {
  const docs = await retrievalProvider.search(q.question, q.courseSlug, 5);
  const context = docs.map((d) => d.chunk);

  const systemPrompt = `You are a history tutor. Only answer based on provided sources.`;
  const response = await llmProvider.generateResponse(q.question, context, systemPrompt);

  if (q.shouldRefuse) {
    const refused = response.confidence < 0.5 || response.citations.length === 0;
    return {
      question: q.question,
      category: q.category,
      passed: refused,
      factualAccuracy: refused ? 1 : 0,
      hasCitations: false,
      refusedCorrectly: refused,
      details: refused ? "Correctly refused out-of-scope question" : "Failed to refuse",
    };
  }

  const contentLower = response.content.toLowerCase();
  const factsFound = q.expectedFacts.filter((f) => contentLower.includes(f.toLowerCase()));
  const factualAccuracy =
    q.expectedFacts.length > 0 ? factsFound.length / q.expectedFacts.length : 1;
  const hasCitations = response.citations.length > 0;

  return {
    question: q.question,
    category: q.category,
    passed: factualAccuracy >= 0.5 && hasCitations,
    factualAccuracy,
    hasCitations,
    details: `Facts: ${factsFound.length}/${q.expectedFacts.length}, Citations: ${response.citations.length}`,
  };
}
