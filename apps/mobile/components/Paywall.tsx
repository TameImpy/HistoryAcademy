import { Text, View, StyleSheet, Pressable, Linking } from "react-native";
import { PRICING } from "@history-academy/shared";

interface PaywallProps {
  onDismiss?: () => void;
}

const CHECKOUT_BASE = "https://checkout.historyextra.academy";

export function Paywall({ onDismiss }: PaywallProps) {
  const openCheckout = (plan: "monthly" | "annual") => {
    Linking.openURL(`${CHECKOUT_BASE}?plan=${plan}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Unlock Full Access</Text>
        <Text style={styles.subtitle}>
          Get unlimited access to all courses, quizzes, AI tutor, and certificates.
        </Text>

        <View style={styles.features}>
          {[
            "All courses and lessons",
            "AI History Tutor",
            "Quizzes and certificates",
            "New courses every month",
          ].map((f) => (
            <Text key={f} style={styles.feature}>
              - {f}
            </Text>
          ))}
        </View>

        <Text style={styles.trialText}>Start your {PRICING.trialDays}-day free trial</Text>

        <Pressable style={styles.primaryButton} onPress={() => openCheckout("annual")}>
          <Text style={styles.primaryButtonText}>{PRICING.annual.label}</Text>
          <Text style={styles.savingsText}>Save 30%</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => openCheckout("monthly")}>
          <Text style={styles.secondaryButtonText}>{PRICING.monthly.label}</Text>
        </Pressable>

        {onDismiss && (
          <Pressable onPress={onDismiss}>
            <Text style={styles.dismissText}>Maybe later</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  features: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  trialText: {
    fontSize: 13,
    color: "#2e7d32",
    fontWeight: "600",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  savingsText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#1a1a2e",
    fontSize: 15,
    fontWeight: "600",
  },
  dismissText: {
    color: "#999",
    fontSize: 13,
    marginTop: 8,
  },
});
