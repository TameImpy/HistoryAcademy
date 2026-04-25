export type SubscriptionStatus = "active" | "trialing" | "expired" | "none";

export type SubscriptionInfo = {
  status: SubscriptionStatus;
  plan?: "monthly" | "annual";
  currentPeriodEnd?: string;
};

export const PRICING = {
  monthly: { amount: 599, currency: "gbp", label: "£5.99/mo" },
  annual: { amount: 4999, currency: "gbp", label: "£49.99/yr" },
  trialDays: 7,
} as const;
