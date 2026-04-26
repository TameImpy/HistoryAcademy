import { Text, View, StyleSheet, Pressable } from "react-native";
import { tone, fonts } from "../lib/theme";

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Off the map</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>RETRY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: tone.bg,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    fontWeight: "500",
    color: tone.ink,
    marginBottom: 8,
  },
  message: {
    fontFamily: fonts.serif,
    fontSize: 14,
    fontStyle: "italic",
    color: tone.ink2,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: tone.ink,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: tone.bg,
  },
});
