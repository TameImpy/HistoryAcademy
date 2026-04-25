export type LessonProgress = {
  lessonId: string;
  courseSlug: string;
  status: "not_started" | "in_progress" | "completed";
  playbackPositionSeconds: number;
  completedAt?: string;
};

export type CourseProgress = {
  courseSlug: string;
  completionPercent: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  lastAccessedAt: string;
  lastLessonId: string;
};

export type StreakInfo = {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
};
