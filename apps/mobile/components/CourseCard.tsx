import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import type { CourseListItem } from "@history-academy/shared";

export function CourseCard({ course }: { course: CourseListItem }) {
  const router = useRouter();

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/course/${course.slug}`)}>
      <Image source={{ uri: course.heroImageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.meta}>
          {course.instructor} · {course.level} · {course.durationHours}h
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
          {course.summary}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: "#888",
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
