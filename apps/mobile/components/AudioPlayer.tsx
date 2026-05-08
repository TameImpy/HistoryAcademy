import { View, StyleSheet, Text } from "react-native";
import { tone, fonts } from "../lib/theme";

interface AudioPlayerProps {
  uri: string;
  title: string;
  onProgress?: (positionSeconds: number) => void;
}

export function AudioPlayer({ title }: AudioPlayerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.artwork}>
        <Text style={styles.artworkIcon}>A</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sublabel}>Audio player — will connect to Mux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    backgroundColor: tone.ink,
  },
  artwork: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2a2a4e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  artworkIcon: {
    fontFamily: fonts.mono,
    fontSize: 40,
    color: tone.paper,
  },
  title: {
    fontFamily: fonts.serif,
    color: tone.paper,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  sublabel: {
    fontFamily: fonts.serif,
    fontSize: 12,
    fontStyle: "italic",
    color: "#888",
  },
});
