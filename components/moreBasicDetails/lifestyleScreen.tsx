import {
  View,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Models } from "appwrite";
import { useAppwrite, user } from "../../contexts/AppwriteContext";

const { width: PAGE_WIDTH } = Dimensions.get("window");

type lifestyle = Models.Document & {
  category: string;
  title: string;
};

const MAX_LIFESTYLES = 5;

const LifestylesScreen = ({ onSubmit }: { onSubmit: () => void }) => {
  const { appwrite, session, user, setUser } = useAppwrite();
  const [lifestyles, setLifestyles] = useState<string[]>(
    user?.lifestyle_preferences ?? []
  );
  const [availableLifestyles, setAvailableLifestyles] =
    useState<Models.DocumentList<lifestyle>>();
  const [loading, setLoading] = useState(false);

  const onStepSubmit = async () => {
    if (lifestyles.length > 0) {
      setLoading(true);
      try {
        const user = await appwrite.updateUser(session?.userId as string, {
          lifestyle_preferences: lifestyles,
        });
        setUser(user as user);
        onSubmit();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "pick your lifestyles.",
      });
    }
  };

  const getlifestyles = async () => {
    setLoading(true);
    try {
      const resp = await appwrite.getLifestylesLists();

      if (resp) {
        setAvailableLifestyles(resp as Models.DocumentList<lifestyle>);
      } else {
        console.log("something went wrong");
      }
    } catch (e) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getlifestyles();
  }, []);

  return (
    <View style={{ width: PAGE_WIDTH, padding: 16 }}>
      {loading && <ActivityIndicator />}

      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`Your lifestyles`}{" "}
        <Text style={{ fontFamily: "nunito", fontSize: 24 }}>
          ({lifestyles.length}/{MAX_LIFESTYLES})
        </Text>
      </Text>

      <Text style={{ fontFamily: "nunito", fontSize: 18 }}>
        {`Pick up to ${MAX_LIFESTYLES} things that you think reflects your lifestyle.`}
      </Text>

      <View
        style={[
          {
            marginTop: 32,
          },
          styles.tagsWrapper,
        ]}
      >
        {availableLifestyles?.documents.map((lifestyle) => (
          <Text
            key={lifestyle.$id}
            style={[
              styles.tag,
              {
                backgroundColor: lifestyles.includes(lifestyle.$id)
                  ? Colors.light.secondaryAccent
                  : Colors.light.secondary,
              },
            ]}
            onPress={() => {
              if (lifestyles.includes(lifestyle.$id)) {
                setLifestyles((prv) =>
                  prv.filter((item) => item !== lifestyle.$id)
                );
                return;
              }

              if (lifestyles.length < MAX_LIFESTYLES) {
                setLifestyles((prv) => [...prv, lifestyle.$id]);
              } else {
                Toast.show({
                  type: "error",
                  text1: `cannot pick more than ${MAX_LIFESTYLES}`,
                });
              }
            }}
          >
            {lifestyle.title}
          </Text>
        ))}
      </View>

      <Pressable
        style={{
          position: "absolute",
          bottom: 80,
          width: 62,
          height: 62,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light.text,

          borderRadius: 32,
        }}
        onPress={onStepSubmit}
      >
        <Ionicons name="arrow-forward" size={32} color="#fafafa" />
      </Pressable>
    </View>
  );
};

export default LifestylesScreen;

const styles = StyleSheet.create({
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    margin: 4,
    alignSelf: "flex-start",
    backgroundColor: Colors.light.secondary,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
