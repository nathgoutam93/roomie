import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable, Text } from "react-native";
import { Scenes } from "../../constants/OnboardingScenes";

const NextButton = ({
  onNextPressed,
  activeScene,
}: {
  onNextPressed: () => void;
  activeScene: SharedValue<number>;
}) => {
  const getStarted = useAnimatedStyle(() => {
    return {
      top: withSpring(activeScene.value === Scenes.length - 1 ? 0 : 50),
      opacity: withTiming(activeScene.value === Scenes.length - 1 ? 1 : 0),
    };
  });

  const hideArrow = useAnimatedStyle(() => {
    return {
      top: withSpring(activeScene.value === Scenes.length - 1 ? 50 : 0),
      opacity: withTiming(activeScene.value === Scenes.length - 1 ? 0 : 1),
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(activeScene.value === Scenes.length - 1 ? 250 : 50, {
        damping: 100,
      }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#000",
          overflow: "hidden",
        },
        rStyle,
      ]}
    >
      <Pressable
        onPress={onNextPressed}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {/* Get Started */}
        <Animated.View
          style={[
            {
              position: "absolute",
              alignSelf: "center",
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
            getStarted,
          ]}
        >
          <Text style={{ color: "#fafafa", fontSize: 24, marginRight: 4 }}>
            Get Started
          </Text>
          <Ionicons name="arrow-forward" size={24} color="#fafafa" />
        </Animated.View>

        {/* Next Arrow */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            hideArrow,
          ]}
        >
          <Ionicons name="arrow-forward" size={32} color="#fafafa" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default NextButton;
