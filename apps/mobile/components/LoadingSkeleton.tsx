import { View, StyleSheet } from "react-native";
import { tone } from "../lib/theme";

export function LoadingSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={[styles.line, { width: "40%", height: 10 }]} />
          <View style={[styles.line, { width: "70%", height: 22, marginTop: 8 }]} />
          <View style={styles.imagePlaceholder} />
          <View style={[styles.line, { width: "60%", marginTop: 12 }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: tone.bg,
    flex: 1,
  },
  card: {
    backgroundColor: tone.paper,
    borderWidth: 1.5,
    borderColor: tone.rule,
    padding: 18,
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: tone.bg,
    marginTop: 14,
  },
  line: {
    height: 12,
    backgroundColor: tone.bg,
  },
});
