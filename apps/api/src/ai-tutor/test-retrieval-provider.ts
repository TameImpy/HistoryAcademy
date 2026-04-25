import type { RetrievalProvider } from "./retrieval-provider.js";
import type { CorpusDocument } from "@history-academy/shared";

const DUMMY_CORPUS: CorpusDocument[] = [
  {
    id: "corpus_1",
    title: "The Battle of Bosworth Field",
    source: "lesson_content",
    chunk:
      "The Battle of Bosworth Field on 22 August 1485 was one of the most decisive encounters in English history. Henry Tudor defeated King Richard III, ending the Plantagenet dynasty and establishing Tudor rule.",
    courseSlug: "tudor-dynasty",
    relevanceScore: 0.95,
  },
  {
    id: "corpus_2",
    title: "Henry VII's Financial Policies",
    source: "podcast_transcript",
    chunk:
      "Henry VII personally audited the royal accounts, built up enormous cash reserves, and used bonds and recognisances to keep his nobility in check. By the time of his death in 1509, he had transformed the English monarchy.",
    courseSlug: "tudor-dynasty",
    relevanceScore: 0.88,
  },
  {
    id: "corpus_3",
    title: "The Roman Invasion of Britain",
    source: "article",
    chunk:
      "The Emperor Claudius's invasion of Britain in AD 43 was a far more serious undertaking than Caesar's expeditions. Four legions crossed the Channel and established a bridgehead in Kent.",
    courseSlug: "roman-britain",
    relevanceScore: 0.91,
  },
];

export class TestRetrievalProvider implements RetrievalProvider {
  private corpus = [...DUMMY_CORPUS];

  async search(query: string, courseSlug?: string, limit = 5): Promise<CorpusDocument[]> {
    let results = this.corpus;

    if (courseSlug) {
      results = results.filter((d) => d.courseSlug === courseSlug);
    }

    // Simple keyword matching for test purposes
    const queryWords = query.toLowerCase().split(/\s+/);
    results = results.filter((d) =>
      queryWords.some(
        (w) => d.chunk.toLowerCase().includes(w) || d.title.toLowerCase().includes(w),
      ),
    );

    return results.slice(0, limit);
  }

  async ingest(documents: CorpusDocument[]): Promise<{ ingested: number }> {
    this.corpus.push(...documents);
    return { ingested: documents.length };
  }
}
