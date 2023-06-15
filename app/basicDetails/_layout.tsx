import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppwrite } from "../../contexts/AppwriteContext";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";

const AuthLayout = () => {
  const router = useRouter();
  const { isLoading, session, user } = useAppwrite();

  useEffect(() => {
    if (isLoading) return;

    if (typeof session !== "undefined") {
      if (user && user.built_profile) {
        router.replace("/explorer");
        return;
      } else if (user) {
        router.replace("/moreBasicDetails");
        return;
      }
    }
  }, [session, isLoading, user]);

  if (isLoading) return <SplashScreen />;

  return (
    <>
      <StatusBar backgroundColor={Colors.light.accent} />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      />
    </>
  );
};

export default AuthLayout;
