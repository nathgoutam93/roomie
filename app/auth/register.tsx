import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppImages } from "../../assets/images";
import { useAppwrite } from "../../contexts/AppwriteContext";
import { useState } from "react";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import Colors from "../../constants/Colors";

const RegisterScreen = () => {
  const router = useRouter();
  const { appwrite, setSession } = useAppwrite();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: string().email({ message: "please use valid email address" }),
        password: string().min(8, {
          message: "password must be atleast 8 characeters.",
        }),
        username: string().min(3, "username must be atleast 3 characters."),
      })
    ),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (data: FieldValues) => {
    setLoading(true);
    try {
      const session = await appwrite.createAccount({
        email: data.email,
        password: data.password,
        name: data.username,
      });
      setSession(session);
      Toast.show({
        type: "success",
        text1: "Signed Up Successfully.",
      });
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Failed to create account.",
          text2: e.message,
        });
      } else {
        console.log(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, padding: 16, backgroundColor: Colors.light.primary }}
    >
      {loading && <ActivityIndicator />}

      <Pressable onPress={() => router.back()}>
        <Ionicons name="ios-return-up-back" size={32} color="black" />
      </Pressable>

      <View style={{ flex: 1, marginTop: 48 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 32, fontWeight: "500" }}>
            Make the first step towards finding your perfect roommate.
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
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
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,
                }}
                placeholder="@_yourname"
              />
            )}
            name="username"
          />
          {errors.email && (
            <Text
              style={{ fontSize: 10, alignSelf: "flex-start", paddingLeft: 16 }}
            >
              {errors.username?.message?.toString()}
            </Text>
          )}

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
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,

                  marginTop: 16,
                }}
                placeholder="your@email.com"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text
              style={{ fontSize: 10, alignSelf: "flex-start", paddingLeft: 16 }}
            >
              {errors.email.message?.toString()}
            </Text>
          )}

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
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 16,

                  marginTop: 16,
                }}
                secureTextEntry={true}
                placeholder="**********"
              />
            )}
            name="password"
          />
          {errors.email && <Text>{errors.password?.message?.toString()}</Text>}

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={AppImages.positive_girl}
              style={{ width: 256, height: 212 }}
            />
          </View>

          <Pressable
            onPress={handleSubmit(handleSignUp)}
            style={{
              width: "100%",
              paddingHorizontal: 24,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              backgroundColor: "#000",

              marginVertical: 16,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
              Sign up
            </Text>
          </Pressable>
          <Text>
            already have an account?{" "}
            <Link href={"/auth"}>
              <Text style={{ fontWeight: "600" }}>Sign in</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
