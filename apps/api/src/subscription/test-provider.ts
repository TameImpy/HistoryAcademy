import type { SubscriptionProvider } from "./provider.js";
import type { SubscriptionInfo } from "@history-academy/shared";

export class TestSubscriptionProvider implements SubscriptionProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSubscription(userId: string): Promise<SubscriptionInfo> {
    // In test mode, all authenticated users have an active subscription
    return { status: "active", plan: "monthly" };
  }
}
