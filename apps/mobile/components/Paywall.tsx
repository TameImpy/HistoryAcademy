import { Text, View, StyleSheet, Pressable, Linking } from "react-native";
import { PRICING } from "@history-academy/shared";
import { tone, fonts } from "../lib/theme";

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
        <Text style={styles.plateLabel}>PLATE VI · MEMBERSHIP</Text>
        <Text style={styles.title}>
          Your expedition{"\n"}
          <Text style={styles.italic}>awaits.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Unlimited access to all courses, the AI tutor, quizzes, and certificates.
        </Text>

        <Text style={styles.trialText}>{PRICING.trialDays}-day free trial · cancel anytime</Text>

        <Pressable style={styles.primaryButton} onPress={() => openCheckout("annual")}>
          <Text style={styles.primaryButtonText}>ANNUAL · {PRICING.annual.label}</Text>
          <Text style={styles.savingsText}>Best value</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => openCheckout("monthly")}>
          <Text style={styles.secondaryButtonText}>MONTHLY · {PRICING.monthly.label}</Text>
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
    backgroundColor: "rgba(31,42,42,0.7)",
    padding: 24,
  },
  card: {
    backgroundColor: tone.paper,
    borderWidth: 1.5,
    borderColor: tone.ink,
    padding: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  plateLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: tone.red,
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    fontWeight: "500",
    color: tone.ink,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
  },
  italic: { fontStyle: "italic" },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: tone.ink2,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  trialText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: tone.teal,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: tone.ink,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: tone.bg,
  },
  savingsText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: tone.brass,
    letterSpacing: 1,
    marginTop: 4,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1.5,
    borderColor: tone.ink,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  secondaryButtonText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: tone.ink,
  },
  dismissText: {
    fontFamily: fonts.serif,
    fontSize: 13,
    fontStyle: "italic",
    color: tone.ink2,
    marginTop: 8,
  },
});
