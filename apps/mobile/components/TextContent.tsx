import { ScrollView, Text, StyleSheet } from "react-native";

interface TextContentProps {
  content: string;
  title: string;
}

export function TextContent({ content, title }: TextContentProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
  },
});
