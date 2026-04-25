import type { CorpusDocument } from "@history-academy/shared";

export interface RetrievalProvider {
  search(query: string, courseSlug?: string, limit?: number): Promise<CorpusDocument[]>;
  ingest(documents: CorpusDocument[]): Promise<{ ingested: number }>;
}
