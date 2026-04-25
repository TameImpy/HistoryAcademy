import type { Citation } from "@history-academy/shared";

export interface LLMResponse {
  content: string;
  citations: Citation[];
  confidence: number;
}

export interface LLMProvider {
  generateResponse(question: string, context: string[], systemPrompt: string): Promise<LLMResponse>;
}
