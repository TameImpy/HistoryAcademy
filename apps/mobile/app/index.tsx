import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, View, Text } from "react-native";
import type { CourseListItem } from "@history-academy/shared";
import { api } from "../lib/api";
import { CourseCard } from "../components/CourseCard";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ErrorState } from "../components/ErrorState";
import { tone, fonts } from "../lib/theme";

export default function CatalogueScreen() {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setError(null);
      const data = await api.listCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCourses();
  }, [fetchCourses]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={fetchCourses} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <CourseCard course={item} index={index} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.headerTitle}>History Academy</Text>
                <Text style={styles.headerSubtitle}>AN ATLAS OF ERAS</Text>
              </View>
            </View>
            <View style={styles.sectionLabel}>
              <View style={styles.redLine} />
              <Text style={styles.plateLabel}>PLATE I · EXPEDITIONS</Text>
            </View>
            <Text style={styles.sectionTitle}>
              Six expeditions{"\n"}
              <Text style={styles.italic}>now boarding.</Text>
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tone.bg,
  },
  list: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: tone.ink,
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    fontWeight: "600",
    color: tone.ink,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.ink2,
    marginTop: 2,
  },
  sectionLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  redLine: {
    width: 24,
    height: 1,
    backgroundColor: tone.red,
  },
  plateLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    color: tone.red,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 36,
    fontWeight: "500",
    color: tone.ink,
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  italic: {
    fontStyle: "italic",
  },
});
