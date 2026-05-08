import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, RefreshControl } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import type { Course } from "@history-academy/shared";
import { api } from "../../lib/api";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import { ErrorState } from "../../components/ErrorState";
import { tone, fonts } from "../../lib/theme";

export default function CourseDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { isSignedIn } = useAuth();
  const router = useRouter();
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
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>EXPEDITION · {course.level.toUpperCase()}</Text>
        <Text style={styles.heroTitle}>{course.title}</Text>
        <Text style={styles.heroInstructor}>
          Charted by <Text style={styles.bold}>{course.instructor}</Text>
        </Text>
      </View>

      <View style={styles.content}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            [String(course.modules.reduce((s, m) => s + m.lessons.length, 0)), "Lessons"],
            [`${course.durationHours}h`, "Duration"],
            [course.level, "Level"],
          ].map(([value, label], i) => (
            <View key={i} style={styles.stat}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.summary}>{course.summary}</Text>

        {/* Modules */}
        {course.modules.map((mod) => (
          <View key={mod.id} style={styles.moduleSection}>
            <View style={styles.moduleLabelRow}>
              <View style={styles.redLine} />
              <Text style={styles.moduleLabel}>MODULE {mod.order}</Text>
            </View>
            <Text style={styles.moduleTitle}>{mod.title}</Text>
            <Text style={styles.moduleSummary}>{mod.summary}</Text>

            {mod.lessons.map((lesson) => {
              const currentIndex = lessonIndex++;
              const isLocked = currentIndex > 0 && !isSignedIn;

              return (
                <Pressable
                  key={lesson.id}
                  style={styles.lessonRow}
                  onPress={() => {
                    if (isLocked) {
                      router.push("/(auth)/sign-in");
                    } else {
                      router.push(`/lesson/${lesson.id}?courseSlug=${slug}`);
                    }
                  }}
                >
                  <View style={styles.lessonLeft}>
                    <View style={styles.lessonTypeIcon}>
                      <Text style={styles.lessonTypeText}>
                        {lesson.contentType === "video"
                          ? "V"
                          : lesson.contentType === "audio"
                            ? "A"
                            : "T"}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.lessonTitle, isLocked && styles.lockedText]}>
                        {lesson.title}
                      </Text>
                      <Text style={styles.lessonMeta}>{lesson.durationMinutes} min</Text>
                    </View>
                  </View>
                  {currentIndex === 0 ? (
                    <Text style={styles.freeTag}>FREE</Text>
                  ) : isLocked ? (
                    <Text style={styles.lockText}>LOCKED</Text>
                  ) : null}
                </Pressable>
              );
            })}

            {mod.quiz && (
              <View style={styles.quizRow}>
                <Text style={styles.quizLabel}>◆ Quiz · {mod.quiz.questions.length} questions</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tone.bg },
  hero: {
    padding: 24,
    paddingTop: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: tone.ink,
    backgroundColor: tone.paper,
  },
  heroLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.red,
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: fonts.display,
    fontSize: 36,
    fontWeight: "500",
    color: tone.ink,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  heroInstructor: {
    fontFamily: fonts.serif,
    fontSize: 14,
    fontStyle: "italic",
    color: tone.ink2,
    marginTop: 12,
  },
  bold: { fontWeight: "600", fontStyle: "normal", color: tone.ink },
  content: { padding: 24 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: tone.rule,
    marginBottom: 24,
  },
  stat: { alignItems: "center" },
  statValue: {
    fontFamily: fonts.display,
    fontSize: 22,
    fontWeight: "600",
    color: tone.ink,
  },
  statLabel: {
    fontFamily: fonts.mono,
    fontSize: 8,
    letterSpacing: 1.5,
    color: tone.ink2,
    marginTop: 4,
  },
  summary: {
    fontFamily: fonts.serif,
    fontSize: 15,
    lineHeight: 24,
    color: tone.ink2,
    marginBottom: 28,
  },
  moduleSection: { marginBottom: 28 },
  moduleLabelRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  redLine: { width: 20, height: 1, backgroundColor: tone.red },
  moduleLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.red,
  },
  moduleTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    fontWeight: "600",
    color: tone.ink,
    marginBottom: 4,
  },
  moduleSummary: {
    fontFamily: fonts.serif,
    fontSize: 13,
    fontStyle: "italic",
    color: tone.ink2,
    marginBottom: 12,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: tone.rule,
  },
  lessonLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  lessonTypeIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: tone.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonTypeText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: tone.ink,
  },
  lessonTitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: tone.ink,
  },
  lockedText: { color: tone.ink3 },
  lessonMeta: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: tone.ink2,
    letterSpacing: 1,
    marginTop: 2,
  },
  freeTag: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: tone.teal,
    borderWidth: 1,
    borderColor: tone.teal,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lockText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: tone.ink3,
  },
  quizRow: { paddingVertical: 12, paddingLeft: 42 },
  quizLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: tone.brass,
    letterSpacing: 0.5,
  },
});
