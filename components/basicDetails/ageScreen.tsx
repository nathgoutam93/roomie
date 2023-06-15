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
import { calculateAge } from "../../utils/calculateAge";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const AgeScreen = ({
  onSubmit,
}: {
  onSubmit: (data: { age: number }) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        day: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])$/, "Invalid day"),
        month: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
        year: z.string().regex(/^\d{4}$/, "Invalid year"),
      })
    ),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  const onStepSubmit = (data: { day: string; month: string; year: string }) => {
    const age = calculateAge(
      new Date(`${data.year}-${data.month}-${data.day}`)
    );

    onSubmit({ age });
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                inputMode="numeric"
                maxLength={2}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  margin: 2,
                  height: 48,
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  backgroundColor: "#fafafa",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,
                }}
                placeholder="dd"
              />
            )}
            name="day"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                inputMode="numeric"
                maxLength={2}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  margin: 2,
                  height: 48,
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  backgroundColor: "#fafafa",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,
                }}
                placeholder="mm"
              />
            )}
            name="month"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                inputMode="numeric"
                maxLength={4}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  margin: 2,
                  height: 48,
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  backgroundColor: "#fafafa",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,
                }}
                placeholder="yyyy"
              />
            )}
            name="year"
          />
        </View>

        <Text
          style={{
            color: Colors.light.text,
            fontSize: 12,
            marginTop: 16,
            paddingHorizontal: 8,
          }}
        >
          {`We will only show your age on your profile,\nnot your birthday.`}
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

export default AgeScreen;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    padding: 16,
    backgroundColor: Colors.light.accent,
  },
});
