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

export type {
  Course,
  Module,
  Lesson,
  Quiz,
  QuizQuestion,
  ReadingListItem,
  CourseListItem,
} from "./content.js";
