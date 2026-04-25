import type { LessonProgress, CourseProgress, StreakInfo } from "@history-academy/shared";

export interface ProgressProvider {
  saveProgress(
    userId: string,
    lessonId: string,
    courseSlug: string,
    playbackPositionSeconds: number,
  ): Promise<LessonProgress>;
  getCourseProgress(userId: string, courseSlug: string): Promise<CourseProgress>;
  getStreak(userId: string): Promise<StreakInfo>;
  getContinueLearning(userId: string): Promise<CourseProgress | null>;
}
