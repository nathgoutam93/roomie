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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Models } from "appwrite";
import { useAppwrite, user } from "../../contexts/AppwriteContext";

const { width: PAGE_WIDTH } = Dimensions.get("window");

type interest = Models.Document & {
  category: string;
  title: string;
};

const MAX_INTERESTS = 5;

const InterestsScreen = ({ onSubmit }: { onSubmit: () => void }) => {
  const { appwrite, session, user, setUser } = useAppwrite();
  const [interests, setInterests] = useState<string[]>(user?.interests ?? []);
  const [availableInterests, setAvailableInterests] =
    useState<Models.DocumentList<interest>>();
  const [loading, setLoading] = useState(false);

  const onStepSubmit = async () => {
    if (interests.length > 0) {
      setLoading(true);
      try {
        const user = await appwrite.updateUser(session?.userId as string, {
          interests: interests,
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
        text1: "pick your interests.",
      });
    }
  };

  const getInterests = async () => {
    setLoading(true);
    try {
      const resp = await appwrite.getInterestsLists();

      if (resp) {
        setAvailableInterests(resp as Models.DocumentList<interest>);
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
    getInterests();
  }, []);

  return (
    <View style={{ width: PAGE_WIDTH, padding: 16 }}>
      {loading && <ActivityIndicator />}

      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`Your interests`}{" "}
        <Text style={{ fontFamily: "nunito", fontSize: 24 }}>
          ({interests.length}/{MAX_INTERESTS})
        </Text>
      </Text>

      <Text style={{ fontFamily: "nunito", fontSize: 18 }}>
        {`Pick up to ${MAX_INTERESTS} things you love. It'll help you match with people who love them too.`}
      </Text>

      <View
        style={[
          {
            marginTop: 32,
          },
          styles.tagsWrapper,
        ]}
      >
        {availableInterests?.documents.map((interest) => (
          <Text
            key={interest.$id}
            style={[
              styles.tag,
              {
                backgroundColor: interests.includes(interest.$id)
                  ? Colors.light.secondaryAccent
                  : Colors.light.secondary,
              },
            ]}
            onPress={() => {
              if (interests.includes(interest.$id)) {
                setInterests((prv) =>
                  prv.filter((item) => item !== interest.$id)
                );
                return;
              }

              if (interests.length < MAX_INTERESTS) {
                setInterests((prv) => [...prv, interest.$id]);
              } else {
                Toast.show({
                  type: "error",
                  text1: `cannot pick more than ${MAX_INTERESTS}`,
                });
              }
            }}
          >
            {interest.title}
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

export default InterestsScreen;

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
