import type { ContentProvider } from "./provider.js";
import type { CourseListItem, Course, ReadingListItem } from "@history-academy/shared";
import { SEED_COURSES, SEED_READING_LISTS } from "./seed-data.js";

export class TestContentProvider implements ContentProvider {
  async listCourses(): Promise<CourseListItem[]> {
    return SEED_COURSES.filter((c) => c.status === "published").map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      summary: course.summary,
      instructor: course.instructor,
      level: course.level,
      durationHours: course.durationHours,
      heroImageUrl: course.heroImageUrl,
    }));
  }

  async getCourse(slug: string): Promise<Course | null> {
    return SEED_COURSES.find((c) => c.slug === slug && c.status === "published") ?? null;
  }

  async getReadingList(slug: string): Promise<ReadingListItem[]> {
    return SEED_READING_LISTS[slug] ?? [];
  }
}
