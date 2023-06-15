import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

// import { userWithaddress } from "../../constants/fakeData";
import Colors from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { user } from "../../contexts/AppwriteContext";
import { userWithaddress } from "../../constants/fakeData";

type props = {
  user: userWithaddress;
  index: number;
  totalItems: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 16;
const CARD_HEIGHT = CARD_WIDTH * 1.8;

const SIDE = (width + CARD_WIDTH) / 2;
const SNAP_POINTS = [-SIDE, 0, SIDE];

const THRESHOLD = 150;

const SCROLLBAR_HEIGHT = 100;
const SCROLLTRACK_HEIGHT = 20;

const SwipableProfileCard = ({
  user,
  index,
  totalItems,
  onSwipeLeft,
  onSwipeRight,
}: props) => {
  const translateX = useSharedValue(0);

  const [scorllHeight, setScrollHeight] = useState(0);
  const scrollPosition = useSharedValue(0);

  const scrollTrackOffsetAnimation = useAnimatedStyle(() => {
    const scrollTrackOffset = interpolate(
      scrollPosition.value,
      [0, scorllHeight],
      [0, SCROLLBAR_HEIGHT - SCROLLTRACK_HEIGHT]
    );

    return {
      top: scrollTrackOffset,
    };
  });

  const onPanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: (ev) => {
      // Swiped beyond the threshold
      if (Math.abs(ev.translationX) > THRESHOLD) {
        if (ev.translationX < 0) {
          translateX.value = withSpring(-CARD_WIDTH * 1.5, {
            velocity: ev.velocityX,
            stiffness: 800,
            damping: 50,
          });
          runOnJS(onSwipeLeft)();
        } else {
          translateX.value = withSpring(CARD_WIDTH * 1.5, {
            velocity: ev.velocityX,
            stiffness: 800,
            damping: 50,
          });
          runOnJS(onSwipeRight)();
        }
      } else {
        // Reset to the original position
        translateX.value = withSpring(0, { damping: 100 });
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const rotationRange = [-15, 0, 15];

    const rotation = interpolate(translateX.value, SNAP_POINTS, rotationRange);

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  return (
    <PanGestureHandler
      enabled={index === 0}
      onGestureEvent={onPanGesture}
      activeOffsetX={[-10, 10]}
    >
      <Animated.View
        style={[styles.container, { zIndex: totalItems - index }, rStyle]}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(height) => {
            setScrollHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => {
            setScrollHeight(height);
          }}
          onScroll={(ev) => {
            scrollPosition.value = ev.nativeEvent.contentOffset.y;
          }}
        >
          <View
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              overflow: "hidden",
            }}
          >
            <Animated.Image
              source={user.profile_pic_url}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.name}>
                {user.name}, {user.age}
              </Text>
              <Text style={styles.location}>{user.address}</Text>
            </View>
          </View>
          <View style={{ padding: 16 }}>
            <Text style={styles.title}>About me</Text>
            <Text style={styles.bio}>{user.bio}</Text>

            <Text style={styles.title}>Basics</Text>
            <View
              style={[styles.tagsWrapper, { transform: [{ translateX: -8 }] }]}
            >
              {user.smoking && (
                <View
                  style={[
                    styles.tag,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <MaterialIcons name="smoking-rooms" size={18} color="black" />
                  <Text style={{ marginLeft: 8 }}>{user.smoking}</Text>
                </View>
              )}
              {user.drinking && (
                <View
                  style={[
                    styles.tag,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Ionicons name="beer-outline" size={18} color="black" />
                  <Text style={{ marginLeft: 8 }}>{user.drinking}</Text>
                </View>
              )}
              {user.pets && (
                <View
                  style={[
                    styles.tag,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Ionicons name="paw-outline" size={18} color="black" />
                  <Text style={{ marginLeft: 8 }}>{user.pets}</Text>
                </View>
              )}
              {user.relationship && (
                <View
                  style={[
                    styles.tag,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Ionicons name="heart-outline" size={18} color="black" />
                  <Text style={{ marginLeft: 8 }}>{user.relationship}</Text>
                </View>
              )}
              {user.gender && (
                <View
                  style={[
                    styles.tag,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Ionicons name="body-outline" size={18} color="black" />
                  <Text style={{ marginLeft: 8 }}>{user.gender}</Text>
                </View>
              )}
              {user.religion && <Text style={styles.tag}>{user.religion}</Text>}
            </View>

            <Text style={styles.title}>Lifestyle</Text>
            <View
              style={[styles.tagsWrapper, { transform: [{ translateX: -8 }] }]}
            >
              {user.lifestyle_preferences.map((preference) => (
                <Text key={preference} style={styles.tag}>
                  {preference}
                </Text>
              ))}
            </View>

            <Text style={styles.title}>Interests</Text>
            <View
              style={[styles.tagsWrapper, { transform: [{ translateX: -8 }] }]}
            >
              {user.interests.map((interest) => (
                <Text key={interest} style={styles.tag}>
                  {interest}
                </Text>
              ))}
            </View>

            <Text style={styles.title}>Languages</Text>
            <View
              style={[styles.tagsWrapper, { transform: [{ translateX: -8 }] }]}
            >
              {user.languages.map((language) => (
                <Text key={language} style={styles.tag}>
                  {language}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            height: SCROLLBAR_HEIGHT,
            width: 6,
            backgroundColor: "#fff",
            borderRadius: 8,
          }}
        >
          <Animated.View
            style={[
              {
                width: 6,
                borderRadius: 8,
                backgroundColor: "#dadada",
                height: SCROLLTRACK_HEIGHT,
              },
              scrollTrackOffsetAnimation,
            ]}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SwipableProfileCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colors.light.secondary,
    borderRadius: 32,
    overflow: "hidden",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  details: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  name: {
    color: Colors.light.primary,
    fontFamily: "cherry",
    fontSize: 24,
    // fontWeight: "700",
    // textTransform: "uppercase",
  },
  location: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "nunito",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#272727",
    marginTop: 32,
  },
  bio: {
    fontSize: 20,
    fontFamily: "cherry",
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    margin: 4,
    alignSelf: "flex-start",
    backgroundColor: Colors.light.accent,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
