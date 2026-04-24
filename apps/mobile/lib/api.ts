import type { CourseListItem, Course, ReadingListItem } from "@history-academy/shared";

import Constants from "expo-constants";

const API_BASE = (Constants.expoConfig?.extra?.apiUrl as string) ?? "http://localhost:3000";

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  listCourses: () => fetchJSON<CourseListItem[]>("/courses"),
  getCourse: (slug: string) => fetchJSON<Course>(`/courses/${slug}`),
  getReadingList: (slug: string) => fetchJSON<ReadingListItem[]>(`/courses/${slug}/reading-list`),
};
