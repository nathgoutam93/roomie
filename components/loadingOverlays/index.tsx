import { View, Text } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const LoadingOverlay = () => {
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.accent,
        opacity: 0.8,
      }}
    >
      <Text>LoadingOverlay</Text>
    </View>
  );
};

export default LoadingOverlay;
