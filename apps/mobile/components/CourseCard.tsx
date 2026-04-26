import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import type { CourseListItem } from "@history-academy/shared";
import { tone, fonts } from "../lib/theme";

export function CourseCard({ course, index }: { course: CourseListItem; index: number }) {
  const router = useRouter();

  return (
    <Pressable
      style={[styles.card, { transform: [{ rotate: index % 2 ? "0.3deg" : "-0.2deg" }] }]}
      onPress={() => router.push(`/course/${course.slug}`)}
    >
      <View style={styles.stamp}>
        <Text style={styles.stampText}>{`\u2116\n0${index + 1}`}</Text>
      </View>

      <Text style={styles.era}>COURSE · {course.level.toUpperCase()}</Text>
      <Text style={styles.title}>{course.title}</Text>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Regional map</Text>
      </View>

      <Text style={styles.instructor}>
        Charted by <Text style={styles.instructorName}>{course.instructor}</Text>.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{course.durationHours}H</Text>
        <Text style={[styles.footerText, { color: tone.red }]}>Board →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tone.paper,
    borderWidth: 1.5,
    borderColor: tone.ink,
    padding: 18,
    marginBottom: 16,
  },
  stamp: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderColor: tone.red,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-12deg" }],
  },
  stampText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: tone.red,
    textAlign: "center",
    lineHeight: 11,
  },
  era: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.ink2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    fontWeight: "500",
    color: tone.ink,
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 28,
    maxWidth: "80%",
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: tone.bg,
    borderWidth: 1,
    borderColor: tone.rule,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    color: tone.ink2,
    textTransform: "uppercase",
  },
  instructor: {
    fontFamily: fonts.serif,
    fontSize: 12,
    fontStyle: "italic",
    color: tone.ink2,
    marginTop: 12,
  },
  instructorName: {
    color: tone.ink,
    fontWeight: "600",
    fontStyle: "normal",
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderTopColor: tone.rule,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: tone.ink,
    textTransform: "uppercase",
  },
});
