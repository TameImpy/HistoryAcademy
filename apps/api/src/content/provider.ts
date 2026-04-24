import type { CourseListItem, Course, ReadingListItem } from "@history-academy/shared";

export interface ContentProvider {
  listCourses(): Promise<CourseListItem[]>;
  getCourse(slug: string): Promise<Course | null>;
  getReadingList(slug: string): Promise<ReadingListItem[]>;
}
