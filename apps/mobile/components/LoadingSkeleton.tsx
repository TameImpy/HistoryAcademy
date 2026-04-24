import { View, StyleSheet } from "react-native";

export function LoadingSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.content}>
            <View style={[styles.line, { width: "70%" }]} />
            <View style={[styles.line, { width: "50%" }]} />
            <View style={[styles.line, { width: "90%" }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#e8e8e8",
  },
  content: {
    padding: 16,
    gap: 8,
  },
  line: {
    height: 14,
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
  },
});
