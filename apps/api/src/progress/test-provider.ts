import type { ProgressProvider } from "./provider.js";
import type { LessonProgress, CourseProgress, StreakInfo } from "@history-academy/shared";

interface StoredProgress {
  lessonId: string;
  courseSlug: string;
  playbackPositionSeconds: number;
  status: "not_started" | "in_progress" | "completed";
  completedAt?: string;
}

export class TestProgressProvider implements ProgressProvider {
  private store = new Map<string, StoredProgress[]>();

  async saveProgress(
    userId: string,
    lessonId: string,
    courseSlug: string,
    playbackPositionSeconds: number,
  ): Promise<LessonProgress> {
    const key = userId;
    const existing = this.store.get(key) ?? [];
    const idx = existing.findIndex((p) => p.lessonId === lessonId);

    const progress: StoredProgress = {
      lessonId,
      courseSlug,
      playbackPositionSeconds,
      status: playbackPositionSeconds > 0 ? "in_progress" : "not_started",
    };

    if (idx >= 0) {
      existing[idx] = progress;
    } else {
      existing.push(progress);
    }
    this.store.set(key, existing);

    return {
      lessonId,
      courseSlug,
      status: progress.status,
      playbackPositionSeconds,
    };
  }

  async getCourseProgress(userId: string, courseSlug: string): Promise<CourseProgress> {
    const all = this.store.get(userId) ?? [];
    const forCourse = all.filter((p) => p.courseSlug === courseSlug);
    const completed = forCourse.filter((p) => p.status === "completed").length;
    const total = 9; // approximate lessons per course

    return {
      courseSlug,
      completionPercent: Math.round((completed / total) * 100),
      lessonsCompleted: completed,
      lessonsTotal: total,
      lastAccessedAt: new Date().toISOString(),
      lastLessonId: forCourse[forCourse.length - 1]?.lessonId ?? "",
    };
  }

  async getStreak(): Promise<StreakInfo> {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
    };
  }

  async getContinueLearning(userId: string): Promise<CourseProgress | null> {
    const all = this.store.get(userId);
    if (!all || all.length === 0) return null;
    const last = all[all.length - 1];
    return this.getCourseProgress(userId, last.courseSlug);
  }
}
