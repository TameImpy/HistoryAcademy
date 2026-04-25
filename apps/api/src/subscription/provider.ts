import type { SubscriptionInfo } from "@history-academy/shared";

export interface SubscriptionProvider {
  getSubscription(userId: string): Promise<SubscriptionInfo>;
  cancelSubscription(userId: string): Promise<{ status: string }>;
  createCheckoutUrl(userId: string, plan: "monthly" | "annual"): Promise<string>;
}
