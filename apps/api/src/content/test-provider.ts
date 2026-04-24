import type { ContentProvider } from "./provider.js";
import type { CourseListItem, Course, ReadingListItem } from "@history-academy/shared";

const COURSES: Course[] = [
  {
    id: "course_1",
    slug: "tudor-dynasty",
    title: "The Tudor Dynasty",
    summary: "From Henry VII to Elizabeth I",
    instructor: "Dr. Suzannah Lipscomb",
    level: "beginner",
    durationHours: 6,
    heroImageUrl: "https://example.com/tudor.jpg",
    status: "published",
    modules: [
      {
        id: "mod_1",
        order: 1,
        title: "The Rise of the Tudors",
        summary: "How the Tudors came to power",
        lessons: [
          {
            id: "les_1",
            order: 1,
            title: "Bosworth Field",
            contentType: "video",
            muxAssetId: "mux_1",
            durationMinutes: 20,
          },
          {
            id: "les_2",
            order: 2,
            title: "Henry VII's Reign",
            contentType: "audio",
            muxAssetId: "mux_2",
            durationMinutes: 25,
          },
        ],
        quiz: {
          id: "quiz_1",
          questions: [
            {
              id: "q_1",
              text: "In what year was the Battle of Bosworth Field?",
              type: "mcq",
              options: ["1483", "1485", "1487", "1489"],
              correctIndex: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_2",
    slug: "roman-britain",
    title: "Roman Britain",
    summary: "Four centuries of Roman rule",
    instructor: "Prof. Mary Beard",
    level: "intermediate",
    durationHours: 8,
    heroImageUrl: "https://example.com/roman.jpg",
    status: "published",
    modules: [],
  },
];

const READING_LISTS: Record<string, ReadingListItem[]> = {
  "tudor-dynasty": [
    {
      id: "book_1",
      title: "The Tudors",
      author: "Peter Ackroyd",
      bookshopUrl: "https://bookshop.org/tudor",
      amazonUrl: "https://amazon.co.uk/tudor",
    },
  ],
  "roman-britain": [],
};

export class TestContentProvider implements ContentProvider {
  async listCourses(): Promise<CourseListItem[]> {
    return COURSES.filter((c) => c.status === "published").map((course) => ({
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
    return COURSES.find((c) => c.slug === slug && c.status === "published") ?? null;
  }

  async getReadingList(slug: string): Promise<ReadingListItem[]> {
    return READING_LISTS[slug] ?? [];
  }
}
