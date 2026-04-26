import { Stack } from "expo-router";
import { tone, fonts } from "../lib/theme";

// TODO: restore ClerkProvider when Clerk publishable key is configured

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: tone.paper,
        },
        headerTintColor: tone.ink,
        headerTitleStyle: {
          fontFamily: fonts.display,
          fontWeight: "600",
          fontSize: 17,
        },
        headerShadowVisible: false,
        headerBackTitle: "Back",
        contentStyle: {
          backgroundColor: tone.bg,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="course/[slug]" options={{ title: "" }} />
      <Stack.Screen name="lesson/[id]" options={{ title: "Lesson" }} />
      <Stack.Screen name="tutor/[courseSlug]" options={{ title: "AI Tutor" }} />
      <Stack.Screen name="(auth)/sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="(auth)/sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
