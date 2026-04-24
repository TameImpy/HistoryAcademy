import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import Constants from "expo-constants";
import { tokenCache } from "../lib/auth-token-cache";

const clerkPublishableKey = (Constants.expoConfig?.extra?.clerkPublishableKey as string) ?? "";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
