import React, { useCallback, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Scenes } from "../constants/OnboardingScenes";
import Scene from "../components/onboarding/Scene";
import DotIndicator from "../components/onboarding/DotIndicator";
import NextButton from "../components/onboarding/NextButton";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Onboarding = () => {
  const router = useRouter();
  const translateX = useSharedValue(0);

  const [loading, setLoading] = useState(true);

  const [statusBarColor, setStatusBarColor] = useState(Scenes[0].background);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;
    },
  });

  const activeScene = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  useDerivedValue(() => {
    runOnJS(setStatusBarColor)(Scenes[activeScene.value].background);
  });

  const handleNext = useCallback(() => {
    if (activeScene.value === Scenes.length - 1) {
      router.replace("/auth/register");
      return;
    }
    scrollRef.current?.scrollTo({
      x: PAGE_WIDTH * (activeScene.value + 1),
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        // await AsyncStorage.clear(); // JUST FOR DEVELOPEMNT

        const value = await AsyncStorage.getItem("is_launched");
        if (value !== null) {
          router.replace("auth");
        } else {
          AsyncStorage.setItem("is_launched", "true");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={statusBarColor} />
      <Animated.ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        {Scenes.map((scene, idx) => {
          return (
            <Scene
              key={idx}
              image={scene.image}
              animation={scene.animation}
              title={scene.title}
              description={scene.description}
              color={scene.color}
              idx={idx}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Scenes.map((_, idx) => {
          return <DotIndicator key={idx} idx={idx} activeScene={activeScene} />;
        })}
      </View>

      <View style={{ position: "absolute", bottom: 80 }}>
        <NextButton onNextPressed={handleNext} activeScene={activeScene} />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return <Onboarding />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
