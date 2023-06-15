import {
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppwrite, user } from "../../contexts/AppwriteContext";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const BioScreen = ({ onSubmit }: { onSubmit: () => void }) => {
  const { appwrite, session, setUser } = useAppwrite();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        bio: z.string().min(15, "bio must be atleast 15 characters."),
      })
    ),
    defaultValues: {
      bio: "",
    },
  });

  const onStepSubmit = async (data: { bio: string }) => {
    setLoading(true);
    try {
      const user = await appwrite.updateUser(session?.userId as string, {
        bio: data.bio,
        built_profile: true,
      });

      setUser(user as user);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

    onSubmit();
  };

  return (
    <View style={{ width: PAGE_WIDTH, padding: 16 }}>
      {loading && <ActivityIndicator />}

      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`Write some lines\nthat describes you?`}
      </Text>

      <View
        style={{
          marginTop: 32,
        }}
      >
        <Text style={{ color: Colors.light.text, fontSize: 8, margin: 8 }}>
          {errors.bio?.message}
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
                height: 100,
                paddingVertical: 10,
                paddingHorizontal: 24,
                backgroundColor: "#fafafa",
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 16,
              }}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4}
              placeholder="bio"
            />
          )}
          name="bio"
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

export default BioScreen;
