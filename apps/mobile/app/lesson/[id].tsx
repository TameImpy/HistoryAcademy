import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import type { Course, Lesson } from "@history-academy/shared";
import { api } from "../../lib/api";
import { VideoPlayer } from "../../components/VideoPlayer";
import { AudioPlayer } from "../../components/AudioPlayer";
import { TextContent } from "../../components/TextContent";

const MUX_STREAM_BASE = "https://stream.mux.com";

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

  const handleProgress = (positionSeconds: number) => {
    // Will report to progress API in Issue #10
    void positionSeconds;
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.loading}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {lesson.contentType === "video" && lesson.muxAssetId && (
        <VideoPlayer
          uri={`${MUX_STREAM_BASE}/${lesson.muxAssetId}.m3u8`}
          onProgress={handleProgress}
        />
      )}

      {lesson.contentType === "audio" && lesson.muxAssetId && (
        <AudioPlayer
          uri={`${MUX_STREAM_BASE}/${lesson.muxAssetId}.m3u8`}
          title={lesson.title}
          onProgress={handleProgress}
        />
      )}

      {lesson.contentType === "text" && lesson.transcript && (
        <TextContent content={lesson.transcript} title={lesson.title} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 12,
  },
  loadingText: {
    color: "#666",
    fontSize: 14,
  },
});
