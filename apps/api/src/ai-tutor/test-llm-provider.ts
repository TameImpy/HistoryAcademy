import type { LLMProvider, LLMResponse } from "./llm-provider.js";

export class TestLLMProvider implements LLMProvider {
  async generateResponse(question: string, context: string[]): Promise<LLMResponse> {
    if (context.length === 0) {
      return {
        content:
          "I don't have enough information in my sources to answer that question confidently. Could you rephrase or ask about a topic covered in your course?",
        citations: [],
        confidence: 0.2,
      };
    }

    return {
      content: `Based on the course materials, here is what I found about "${question}": ${context[0].slice(0, 200)}...`,
      citations: [
        {
          documentId: "doc_test_1",
          title: "Course Transcript",
          source: "lesson_content",
          excerpt: context[0].slice(0, 100),
        },
      ],
      confidence: 0.92,
    };
  }
}
