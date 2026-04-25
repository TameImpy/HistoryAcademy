export const APP_NAME = "HistoryExtra Academy";

export type HealthResponse = {
  status: "ok";
};

export type AuthUser = {
  id: string;
  email: string;
  clerkId: string;
  createdAt: Date;
};

export type { SubscriptionStatus, SubscriptionInfo } from "./subscription.js";
export type { LessonProgress, CourseProgress, StreakInfo } from "./progress.js";
export type {
  CorpusDocument,
  Citation,
  TutorMessage,
  TutorSession,
  TutorFeedback,
} from "./ai-tutor.js";
export { PRICING } from "./subscription.js";

export type {
  Course,
  Module,
  Lesson,
  Quiz,
  QuizQuestion,
  ReadingListItem,
  CourseListItem,
} from "./content.js";
