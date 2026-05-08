import { ScrollView, Text, View, StyleSheet } from "react-native";
import { tone, fonts } from "../lib/theme";

interface TextContentProps {
  content: string;
  title: string;
}

export function TextContent({ content, title }: TextContentProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.labelRow}>
          <View style={styles.redLine} />
          <Text style={styles.label}>TRANSCRIPT</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.body}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tone.bg,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: tone.rule,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  redLine: {
    width: 20,
    height: 1,
    backgroundColor: tone.red,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.red,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    fontWeight: "500",
    color: tone.ink,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  body: {
    fontFamily: fonts.serif,
    fontSize: 16,
    lineHeight: 28,
    color: tone.ink2,
  },
});
