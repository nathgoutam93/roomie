import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import { useAppwrite } from "../../../contexts/AppwriteContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ProfileCard from "../../../components/explorer/Profilecard";
import { SplashScreen } from "expo-router";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { appwrite, setSession, user } = useAppwrite();

  if (!user) <SplashScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontFamily: "cherry",
            fontSize: 32,
            color: Colors.light.text,
          }}
        >
          Roomie
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => {}} style={{ marginHorizontal: 6 }}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user && <ProfileCard user={user} />}
      </View>
      <View style={{ width: "100%", padding: 16 }}>
        <Pressable
          style={{
            width: "100%",
            height: 56,
            borderRadius: 32,
            backgroundColor: Colors.light.accent,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.light.text,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginRight: 16,
            }}
          >
            Edit Profile
          </Text>
          <Ionicons name="build-outline" size={24} color="black" />
        </Pressable>
      </View>
      {/* <Pressable
        onPress={handleLogout}
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 16,
          backgroundColor: "#fafafa",
        }}
      >
        <Ionicons name="log-out-outline" size={32} color="#E40F0F" />
        <Text
          style={{
            color: "#E40F0F",
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 21,
            letterSpacing: 0.25,

            marginLeft: 10,
          }}
        >
          Log out
        </Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
});
