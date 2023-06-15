import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import LottieView from "lottie-react-native";
import { AppLotties } from "../../assets/lotties";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 16;
const CARD_HEIGHT = CARD_WIDTH * 1.8;

const LoadingCard = ({
  animation = AppLotties.loading,
  title = "",
  subtitle = "",
}: {
  animation?: any;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        loop
        autoPlay
        source={animation}
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default LoadingCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.text,
    borderRadius: 32,
    position: "absolute",
    overflow: "hidden",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.light.text,
    textAlign: "center",
  },
});
