import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const DotIndicator = ({
  idx,
  activeScene,
}: {
  idx: number;
  activeScene: Animated.SharedValue<number>;
}) => {
  const rStyle = useAnimatedStyle(() => {
    const isActive = idx === activeScene.value;
    return {
      width: withTiming(isActive ? 30 : 10, {
        duration: 300,
      }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          margin: 2,
          width: 10,
          height: 6,
          backgroundColor: "#000",
          borderRadius: 10,
        },
        rStyle,
      ]}
    ></Animated.View>
  );
};

export default DotIndicator;
