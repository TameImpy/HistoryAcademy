import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable, RefreshControl } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import type { Course } from "@history-academy/shared";
import { api } from "../../lib/api";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import { ErrorState } from "../../components/ErrorState";

export default function CourseDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { isSignedIn } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!slug) return;
    try {
      setError(null);
      const data = await api.getCourse(slug);
      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load course");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={fetchCourse} />;
  if (!course) return null;

  let lessonIndex = 0;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchCourse();
          }}
        />
      }
    >
      <Image source={{ uri: course.heroImageUrl }} style={styles.hero} />

      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaTag}>{course.level}</Text>
          <Text style={styles.metaTag}>{course.durationHours} hours</Text>
          <Text style={styles.metaTag}>
            {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
          </Text>
        </View>

        <Text style={styles.summary}>{course.summary}</Text>

        {course.modules.map((mod) => (
          <View key={mod.id} style={styles.moduleSection}>
            <Text style={styles.moduleTitle}>
              Module {mod.order}: {mod.title}
            </Text>
            <Text style={styles.moduleSummary}>{mod.summary}</Text>

            {mod.lessons.map((lesson) => {
              const currentIndex = lessonIndex++;
              const isLocked = currentIndex > 0 && !isSignedIn;

              return (
                <Pressable key={lesson.id} style={styles.lessonRow}>
                  <View style={styles.lessonLeft}>
                    <Text style={styles.lessonIcon}>
                      {lesson.contentType === "video"
                        ? "V"
                        : lesson.contentType === "audio"
                          ? "A"
                          : "T"}
                    </Text>
                    <View>
                      <Text style={[styles.lessonTitle, isLocked && styles.lockedText]}>
                        {lesson.title}
                      </Text>
                      <Text style={styles.lessonMeta}>{lesson.durationMinutes} min</Text>
                    </View>
                  </View>
                  {currentIndex === 0 ? (
                    <Text style={styles.freeTag}>FREE</Text>
                  ) : isLocked ? (
                    <Text style={styles.lockIcon}>L</Text>
                  ) : null}
                </Pressable>
              );
            })}

            {mod.quiz && (
              <View style={styles.quizRow}>
                <Text style={styles.quizLabel}>Quiz · {mod.quiz.questions.length} questions</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  hero: {
    width: "100%",
    height: 220,
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  instructor: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  metaTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: "#555",
    textTransform: "capitalize",
  },
  summary: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 24,
  },
  moduleSection: {
    marginBottom: 24,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  moduleSummary: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e8e8e8",
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  lockedText: {
    color: "#aaa",
  },
  lessonMeta: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  freeTag: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2e7d32",
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  lockIcon: {
    fontSize: 16,
    color: "#bbb",
  },
  quizRow: {
    paddingVertical: 12,
    paddingLeft: 44,
  },
  quizLabel: {
    fontSize: 14,
    color: "#1a1a2e",
    fontWeight: "500",
  },
});
