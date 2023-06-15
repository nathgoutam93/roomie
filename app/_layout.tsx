import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AppwriteProvider } from "../contexts/AppwriteContext";
import { AppFonts } from "../assets/fonts";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    cherry: AppFonts.cherry,
    nunito: AppFonts.nunito,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppwriteProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AppwriteProvider>
        <Toast />
      </ThemeProvider>
    </>
  );
}
