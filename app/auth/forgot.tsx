import { View, Text, Image, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppImages } from "../../assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import Colors from "../../constants/Colors";

const ForgotScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: string().email({ message: "please use valid email address" }),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: Colors.light.primary }}
    >
      <Pressable onPress={() => router.back()}>
        <Ionicons name="ios-return-up-back" size={32} color="black" />
      </Pressable>

      <View style={{ width: "100%", marginTop: 48 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 48, fontWeight: "600" }}>Forgot</Text>
          <Text style={{ fontSize: 48, fontWeight: "600" }}>Password?</Text>
          <Text style={{ fontSize: 14, maxWidth: 340 }}>
            Don't worry! it happens. Please enter the email address associated
            with your account.
          </Text>
        </View>

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

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={AppImages.thinking_man}
            style={{ width: 256, height: 212 }}
          />
        </View>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            paddingHorizontal: 24,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: "#000",

            marginTop: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotScreen;
