import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const NameScreen = ({
  onSubmit,
}: {
  onSubmit: (data: { username: string }) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().min(3, "username must be atleast 3 characters."),
      })
    ),
    defaultValues: {
      username: "",
    },
  });

  const onStepSubmit = (data: { username: string }) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`What's \nyour first name?`}
      </Text>

      <View
        style={{
          marginTop: 32,
        }}
      >
        <Text style={{ color: Colors.light.text, fontSize: 8, margin: 8 }}>
          {errors.username?.message}
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              style={{
                width: "100%",
                height: 48,
                paddingVertical: 10,
                paddingHorizontal: 24,
                backgroundColor: "#fafafa",
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 16,
              }}
              placeholder="First Name"
            />
          )}
          name="username"
        />

        <Text
          style={{
            color: Colors.light.text,
            fontFamily: "nunito",
            fontSize: 12,
            marginTop: 16,
            paddingHorizontal: 8,
          }}
        >
          This will be shown on your profile.
        </Text>
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
        onPress={handleSubmit(onStepSubmit)}
      >
        <Ionicons name="arrow-forward" size={32} color="#fafafa" />
      </Pressable>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    padding: 16,
    backgroundColor: Colors.light.accent,
  },
});
