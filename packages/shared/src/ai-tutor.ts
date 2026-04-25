export type CorpusDocument = {
  id: string;
  title: string;
  source: "podcast_transcript" | "article" | "lesson_content";
  chunk: string;
  courseSlug?: string;
  relevanceScore: number;
};

export type Citation = {
  documentId: string;
  title: string;
  source: string;
  excerpt: string;
};

export type TutorMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  confidence?: number;
};

export type TutorSession = {
  sessionId: string;
  courseSlug: string;
  messages: TutorMessage[];
  messageCount: number;
};

export type TutorFeedback = {
  sessionId: string;
  messageIndex: number;
  rating: "thumbs_up" | "thumbs_down";
  comment?: string;
};
