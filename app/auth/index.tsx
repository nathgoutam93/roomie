import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
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

const SigninScreen = () => {
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
      })
    ),
  });

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: FieldValues) => {
    setLoading(true);
    try {
      const session = await appwrite.login({
        email: data.email,
        password: data.password,
      });
      setSession(session);
      Toast.show({
        type: "success",
        text1: "Signed in Successfully.",
      });
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Sign in Failed.",
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
          <Text style={{ fontSize: 48, fontWeight: "500" }}>
            Let's sign you in.
          </Text>
          <Text style={{ fontSize: 28, marginTop: 4 }}>Welcome back,</Text>
          <Text style={{ fontSize: 28, marginTop: 4 }}>
            You've been missed!
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
          {errors.email && (
            <Text
              style={{ fontSize: 10, alignSelf: "flex-start", paddingLeft: 16 }}
            >
              {errors.password?.message?.toString()}
            </Text>
          )}

          <Link
            href={"/auth/forgot"}
            style={{ alignSelf: "flex-end", marginVertical: 16 }}
          >
            <Text style={{ fontWeight: "600" }}>forgot password?</Text>
          </Link>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={AppImages.positive_girl}
              style={{ width: 256, height: 212 }}
            />
          </View>

          <Pressable
            disabled={loading}
            onPress={handleSubmit(handleSignIn)}
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
              Sign in
            </Text>
          </Pressable>
          <Text>
            Don't have an account?{" "}
            <Link href={"/auth/register"}>
              <Text style={{ fontWeight: "600" }}>Register</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
