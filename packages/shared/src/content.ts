export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  instructor: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  heroImageUrl: string;
  status: "draft" | "published";
  modules: Module[];
};

export type Module = {
  id: string;
  order: number;
  title: string;
  summary: string;
  lessons: Lesson[];
  quiz?: Quiz;
};

export type Lesson = {
  id: string;
  order: number;
  title: string;
  contentType: "video" | "audio" | "text";
  muxAssetId?: string;
  transcript?: string;
  durationMinutes: number;
};

export type Quiz = {
  id: string;
  questions: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  text: string;
} & (
  | {
      type: "mcq";
      options: string[];
      correctIndex: number;
    }
  | {
      type: "short-answer";
      modelAnswer: string;
    }
);

export type ReadingListItem = {
  id: string;
  title: string;
  author: string;
  bookshopUrl?: string;
  amazonUrl?: string;
};

export type CourseListItem = Pick<
  Course,
  "id" | "slug" | "title" | "summary" | "instructor" | "level" | "durationHours" | "heroImageUrl"
>;
