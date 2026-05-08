import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import type { Course, Lesson } from "@history-academy/shared";
import { api } from "../../lib/api";
import { VideoPlayer } from "../../components/VideoPlayer";
import { AudioPlayer } from "../../components/AudioPlayer";
import { TextContent } from "../../components/TextContent";
import { tone, fonts } from "../../lib/theme";

export default function LessonScreen() {
  const { id, courseSlug } = useLocalSearchParams<{ id: string; courseSlug: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseSlug) return;
    api.getCourse(courseSlug).then((course: Course) => {
      for (const mod of course.modules) {
        const found = mod.lessons.find((l) => l.id === id);
        if (found) {
          setLesson(found);
          break;
        }
      }
      setLoading(false);
    });
  }, [id, courseSlug]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={tone.ink} />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.loading}>
        <Text style={styles.notFound}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {lesson.contentType === "video" && (
        <VideoPlayer uri={`https://stream.mux.com/${lesson.muxAssetId}.m3u8`} />
      )}

      {lesson.contentType === "audio" && (
        <AudioPlayer
          uri={`https://stream.mux.com/${lesson.muxAssetId}.m3u8`}
          title={lesson.title}
        />
      )}

      {lesson.transcript && (
        <TextContent content={lesson.transcript} title={lesson.title} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tone.bg,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tone.bg,
    gap: 12,
  },
  loadingText: {
    fontFamily: fonts.serif,
    color: tone.ink2,
    fontSize: 14,
    fontStyle: "italic",
  },
  notFound: {
    fontFamily: fonts.serif,
    color: tone.ink2,
    fontSize: 16,
  },
});
