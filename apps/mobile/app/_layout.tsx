import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import { ActivityIndicator, View } from "react-native";
import { tokenCache } from "../lib/auth-token-cache";
import { tone, fonts } from "../lib/theme";

import { Fraunces_400Regular, Fraunces_500Medium, Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";
import { Spectral_400Regular, Spectral_400Regular_Italic, Spectral_600SemiBold } from "@expo-google-fonts/spectral";

const clerkKey = Constants.expoConfig?.extra?.clerkPublishableKey as string;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_400Regular,
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Spectral_400Regular,
    Spectral_400Regular_Italic,
    Spectral_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: tone.bg }}>
        <ActivityIndicator size="large" color={tone.ink} />
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <ClerkLoaded>
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
      </ClerkLoaded>
    </ClerkProvider>
  );
}
