import type { SubscriptionInfo } from "@history-academy/shared";

export interface SubscriptionProvider {
  getSubscription(userId: string): Promise<SubscriptionInfo>;
}
