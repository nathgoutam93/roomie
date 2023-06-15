import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton, RadioGroup } from "react-native-radio-buttons-group";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const GenderScreen = ({
  onSubmit,
}: {
  onSubmit: (data: { gender: string }) => void;
}) => {
  const [selectedId, setSelectedId] = useState<string>();

  const onStepSubmit = () => {
    if (selectedId) {
      onSubmit({ gender: selectedId });
    } else {
      Toast.show({
        type: "error",
        text1: "pick a gender.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`What's \nyour gender?`}
      </Text>

      <View
        style={{
          marginTop: 32,
        }}
      >
        <RadioButton
          onPress={setSelectedId}
          selected={selectedId === "male"}
          id="male"
          label="Men"
          value="male"
          containerStyle={{
            backgroundColor: "#fafafa",
            borderRadius: 16,
            padding: 16,
          }}
        />
        <RadioButton
          onPress={setSelectedId}
          selected={selectedId === "female"}
          id="female"
          label="Women"
          value="female"
          containerStyle={{
            backgroundColor: "#fafafa",
            borderRadius: 16,
            padding: 16,
          }}
        />
        <RadioButton
          onPress={setSelectedId}
          selected={selectedId === "non-binary"}
          id="non-binary"
          label="Nonbinary"
          value="non-binary"
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

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    padding: 16,
    backgroundColor: Colors.light.accent,
  },
});
