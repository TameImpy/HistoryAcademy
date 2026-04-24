import { Text, View, StyleSheet, Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { APP_NAME } from "@history-academy/shared";

export default function HomeScreen() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{APP_NAME}</Text>
      <Text style={styles.subtitle}>Learn history from the experts</Text>

      {isSignedIn ? (
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      ) : (
        <View style={styles.authButtons}>
          <Pressable style={styles.button} onPress={() => router.push("/(auth)/sign-in")}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  authButtons: {
    gap: 12,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1a1a2e",
  },
  secondaryButtonText: {
    color: "#1a1a2e",
    fontSize: 16,
    fontWeight: "600",
  },
});
