import {
  View,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Models } from "appwrite";
import { useAppwrite, user } from "../../contexts/AppwriteContext";
import { RadioButton } from "react-native-radio-buttons-group";

const { width: PAGE_WIDTH } = Dimensions.get("window");

type interest = Models.Document & {
  category: string;
  title: string;
};

const DrinkingScreen = ({ onSubmit }: { onSubmit: () => void }) => {
  const { appwrite, session, user, setUser } = useAppwrite();
  const [drinking, setDrinking] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onStepSubmit = async () => {
    setLoading(true);
    try {
      const user = await appwrite.updateUser(session?.userId as string, {
        drinking: drinking,
      });
      setUser(user as user);
      onSubmit();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: PAGE_WIDTH, padding: 16 }}>
      {loading && <ActivityIndicator />}

      <Text
        style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}
      >{`How often \ndo you drink?`}</Text>

      <View
        style={[
          {
            marginTop: 32,
          },
        ]}
      >
        <RadioButton
          onPress={setDrinking}
          selected={drinking === "never"}
          id="never"
          label="Never"
          value="never"
          containerStyle={{
            backgroundColor: "#fafafa",
            borderRadius: 16,
            padding: 16,
          }}
        />
        <RadioButton
          onPress={setDrinking}
          selected={drinking === "socially"}
          id="socially"
          label="Socially"
          value="socially"
          containerStyle={{
            backgroundColor: "#fafafa",
            borderRadius: 16,
            padding: 16,
          }}
        />
        <RadioButton
          onPress={setDrinking}
          selected={drinking === "regularly"}
          id="regularly"
          label="Regularly"
          value="regularly"
          containerStyle={{
            backgroundColor: "#fafafa",
            borderRadius: 16,
            padding: 16,
          }}
        />
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

export default DrinkingScreen;

const styles = StyleSheet.create({
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
