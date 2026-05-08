import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { tone, fonts } from "../../lib/theme";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage ?? "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>We sent a code to {email}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Verification code"
          placeholderTextColor={tone.ink3}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <Pressable style={styles.button} onPress={handleVerify} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={tone.paper} />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Begin your expedition</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={tone.ink3}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={tone.ink3}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={tone.paper} />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/sign-in")}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkBold}>Sign in</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: tone.bg },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    fontWeight: "600",
    color: tone.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 15,
    fontStyle: "italic",
    color: tone.ink2,
    marginBottom: 32,
  },
  error: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: tone.red,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: tone.red,
  },
  input: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: tone.ink,
    borderWidth: 1,
    borderColor: tone.rule,
    backgroundColor: tone.paper,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: tone.ink,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: tone.paper,
    fontWeight: "600",
  },
  linkText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: tone.ink2,
    textAlign: "center",
  },
  linkBold: { fontWeight: "600", color: tone.ink },
});
