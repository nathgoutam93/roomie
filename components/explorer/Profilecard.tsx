import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Colors from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { user } from "../../contexts/AppwriteContext";

type props = {
  user: user;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 16;
const CARD_HEIGHT = CARD_WIDTH * 1.6;

const SCROLLBAR_HEIGHT = 100;
const SCROLLTRACK_HEIGHT = 20;

const ProfileCard = ({ user }: props) => {
  const [scorllHeight, setScrollHeight] = useState(0);
  const scrollPosition = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollPosition.value = event.contentOffset.y;
  });

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

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(width, height) => {
          setScrollHeight(height);
        }}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          setScrollHeight(height);
        }}
        onScroll={scrollHandler}
      >
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: "#000",
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: user.profile_pic_url,
            }}
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
      </Animated.ScrollView>
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
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 32,
    borderColor: Colors.light.text,
    backgroundColor: Colors.light.secondary,
  },
  image: {
    width: "100%",
    height: "100%",
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
    backgroundColor: Colors.light.secondaryAccent,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
