import { View, StyleSheet, Text } from "react-native";
import { tone, fonts } from "../lib/theme";

interface VideoPlayerProps {
  uri: string;
  onProgress?: (positionSeconds: number) => void;
}

export function VideoPlayer({ uri }: VideoPlayerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>V</Text>
      <Text style={styles.label}>VIDEO PLAYER</Text>
      <Text style={styles.sublabel}>Will connect to Mux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: tone.ink,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontFamily: fonts.mono,
    fontSize: 32,
    color: tone.paper,
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    color: tone.paper,
  },
  sublabel: {
    fontFamily: fonts.serif,
    fontSize: 12,
    fontStyle: "italic",
    color: "#888",
    marginTop: 4,
  },
});
