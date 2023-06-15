import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppwrite } from "../../contexts/AppwriteContext";

const AuthLayout = () => {
  const router = useRouter();
  const { isLoading, session } = useAppwrite();

  useEffect(() => {
    if (isLoading) return;

    if (session) {
      router.replace("/explorer");
    }
  }, [session, isLoading]);

  return (
    <>
      {isLoading && <SplashScreen />}
      {!isLoading && (
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        />
      )}
    </>
  );
};

export default AuthLayout;
