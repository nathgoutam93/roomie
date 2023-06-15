import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Colors from "../../constants/Colors";
import { Bar } from "react-native-progress";
import InterestsScreen from "../../components/moreBasicDetails/interestsScreen";
import LifestylesScreen from "../../components/moreBasicDetails/lifestyleScreen";
import SmokingScreen from "../../components/moreBasicDetails/smokingScreen";
import DrinkingScreen from "../../components/moreBasicDetails/drinkingScreen";
import BioScreen from "../../components/moreBasicDetails/bioScreen";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Scenes = ["interests", "lifestyle", "smoking", "drinking", "bio"];

const BasicDetailsScreen = () => {
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [progress, setProgress] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;
    },
  });

  const activeScene = useDerivedValue(() => {
    runOnJS(setProgress)(
      Math.round(translateX.value / PAGE_WIDTH) / (Scenes.length + 1) +
        1 / Scenes.length
    );
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const handleNext = useCallback(() => {
    scrollRef.current?.scrollTo({
      x: PAGE_WIDTH * (activeScene.value + 1),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        scrollEnabled={false}
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <InterestsScreen onSubmit={handleNext} />
        <LifestylesScreen onSubmit={handleNext} />
        <SmokingScreen onSubmit={handleNext} />
        <DrinkingScreen onSubmit={handleNext} />
        <BioScreen onSubmit={handleNext} />
      </Animated.ScrollView>

      <View
        style={{
          position: "absolute",
          top: 60,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Bar
          progress={progress}
          width={PAGE_WIDTH - 30}
          height={4}
          color={Colors.light.text}
          unfilledColor={Colors.light.secondaryAccent}
          borderWidth={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default BasicDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    justifyContent: "center",
    alignItems: "center",
  },
});
