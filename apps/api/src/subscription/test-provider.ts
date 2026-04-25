import type { SubscriptionProvider } from "./provider.js";
import type { SubscriptionInfo } from "@history-academy/shared";

export class TestSubscriptionProvider implements SubscriptionProvider {
  async getSubscription(): Promise<SubscriptionInfo> {
    return { status: "active", plan: "monthly" };
  }

  async cancelSubscription(): Promise<{ status: string }> {
    return { status: "cancelled" };
  }

  async createCheckoutUrl(_userId: string, plan: "monthly" | "annual"): Promise<string> {
    return `https://checkout.test/session?plan=${plan}`;
  }
}
