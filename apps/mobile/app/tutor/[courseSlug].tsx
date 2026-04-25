import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import type { TutorMessage, Citation } from "@history-academy/shared";

const API_BASE = "http://localhost:3000";

export default function TutorChatScreen() {
  const { courseSlug } = useLocalSearchParams<{ courseSlug: string }>();
  const { getToken } = useAuth();
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE}/tutor/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question, courseSlug, sessionId }),
      });

      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages((prev) => [...prev, data.response]);
    } catch {
      Alert.alert("Error", "Failed to get response from tutor");
    } finally {
      setLoading(false);
    }
  };

  const renderCitation = (citation: Citation) => (
    <Pressable
      key={citation.documentId}
      style={styles.citation}
      onPress={() =>
        setExpandedCitation(expandedCitation === citation.documentId ? null : citation.documentId)
      }
    >
      <Text style={styles.citationTitle}>
        [{citation.source}] {citation.title}
      </Text>
      {expandedCitation === citation.documentId && (
        <Text style={styles.citationExcerpt}>{citation.excerpt}</Text>
      )}
    </Pressable>
  );

  const renderMessage = ({ item }: { item: TutorMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === "user" ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <Text style={[styles.messageText, item.role === "user" && styles.userText]}>
        {item.content}
      </Text>
      {item.citations && item.citations.length > 0 && (
        <View style={styles.citationsContainer}>
          <Text style={styles.citationsLabel}>Sources:</Text>
          {item.citations.map(renderCitation)}
        </View>
      )}
      {item.role === "assistant" && (
        <View style={styles.feedbackRow}>
          <Pressable style={styles.feedbackBtn}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={styles.feedbackBtn}>
            <Text>-</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI History Tutor</Text>
        <Text style={styles.headerSubtitle}>Ask about your course</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" />
          <Text style={styles.typingText}>Tutor is thinking...</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question..."
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <Pressable style={styles.sendBtn} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendBtnText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 16, backgroundColor: "#1a1a2e" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  headerSubtitle: { color: "#aaa", fontSize: 13, marginTop: 2 },
  messageList: { padding: 16, paddingBottom: 8 },
  messageBubble: { maxWidth: "80%", padding: 12, borderRadius: 12, marginBottom: 8 },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#1a1a2e" },
  assistantBubble: { alignSelf: "flex-start", backgroundColor: "#fff" },
  messageText: { fontSize: 15, lineHeight: 22, color: "#333" },
  userText: { color: "#fff" },
  citationsContainer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#eee" },
  citationsLabel: { fontSize: 11, color: "#888", fontWeight: "600", marginBottom: 4 },
  citation: { paddingVertical: 4 },
  citationTitle: { fontSize: 12, color: "#1a1a2e", fontWeight: "500" },
  citationExcerpt: { fontSize: 12, color: "#666", marginTop: 4, fontStyle: "italic" },
  feedbackRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  feedbackBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: { color: "#888", fontSize: 13 },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  sendBtnText: { color: "#fff", fontWeight: "600" },
});
