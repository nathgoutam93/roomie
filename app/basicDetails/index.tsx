import React, { useCallback, useEffect, useState } from "react";
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
import NameScreen from "../../components/basicDetails/nameScreen";
import { Bar } from "react-native-progress";
import ProfilePicScreen from "../../components/basicDetails/profilePicScreen";
import AgeScreen from "../../components/basicDetails/ageScreen";
import GenderScreen from "../../components/basicDetails/genderScreen";
import GenderPreferenceScreen from "../../components/basicDetails/genderPreference";
import { useAppwrite } from "../../contexts/AppwriteContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Scenes = ["name", "image", "age", "gender", "preference"];

const BasicDetailsScreen = () => {
  const { session, setUser, appwrite } = useAppwrite();
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleStepSubmit = (data: {}) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));

    handleNext();
  };

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

  useEffect(() => {
    if (activeScene.value === Scenes.length - 1) {
      createProfile();
    }
  }, [formData]);

  const createProfile = async () => {
    setLoading(true);
    try {
      const user = await appwrite.createUser(
        session?.userId as string,
        formData
      );

      if (user) {
        setUser(user);
      } else {
        Toast.show({
          type: "error",
          text1: "Oops! something went wrong.",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator />}
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
        <NameScreen onSubmit={handleStepSubmit} />
        <ProfilePicScreen onSubmit={handleStepSubmit} />
        <AgeScreen onSubmit={handleStepSubmit} />
        <GenderScreen onSubmit={handleStepSubmit} />
        <GenderPreferenceScreen onSubmit={handleStepSubmit} />
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
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
