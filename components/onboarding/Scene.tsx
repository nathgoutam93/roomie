import { Dimensions, Text } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Scenes } from "../../constants/OnboardingScenes";
import LottieView from "lottie-react-native";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Scene = ({
  image,
  animation,
  title,
  description,
  color,
  idx,
  translateX,
}: {
  image: any;
  animation: any;
  title: string;
  description: string;
  color: string;
  idx: number;
  translateX: SharedValue<number>;
}) => {
  const background = useAnimatedStyle(() => {
    const inputRange = Scenes.map((_, idx) => PAGE_WIDTH * idx);

    const bg = interpolateColor(
      translateX.value,
      inputRange,
      Scenes.map((scene) => scene.background)
    );

    return {
      backgroundColor: bg,
    };
  });

  const textTransition = useAnimatedStyle(() => {
    const inputRange = Scenes.map((_, id) => PAGE_WIDTH * id);

    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(
              translateX.value,
              inputRange,
              Scenes.map((_, id) => (id === idx ? 0 : 100))
            ),
            {
              damping: 120,
            }
          ),
        },
      ],
      opacity: withTiming(
        interpolate(
          translateX.value,
          inputRange,
          Scenes.map((_, id) => (id === idx ? 1 : 0))
        ),
        {
          duration: 300,
        }
      ),
    };
  });

  return (
    <Animated.View
      key={idx}
      style={[
        {
          padding: 16,
          width: PAGE_WIDTH,
          alignItems: "center",
        },
        background,
      ]}
    >
      <Animated.View
        style={[
          {
            // width: 400,
            height: 400,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          },
          // imageTransition,
        ]}
      >
        <LottieView
          loop
          autoPlay
          source={animation}
          style={{
            width: "100%",
          }}
        />
      </Animated.View>

      <Animated.View style={[{ paddingVertical: 16 }, textTransition]}>
        <Text
          style={{
            fontFamily: "cherry",
            fontSize: 42,
            fontWeight: "200",
            color: color,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "nunito",
            fontSize: 18,
            color: color,
            textAlign: "center",

            marginTop: 16,
          }}
        >
          {description}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Scene;
