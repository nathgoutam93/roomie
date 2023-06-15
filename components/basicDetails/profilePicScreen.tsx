import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const ProfilePicScreen = ({
  onSubmit,
}: {
  onSubmit: (data: { image: string }) => void;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onStepSubmit = () => {
    if (image) {
      onSubmit({ image: image });
    } else {
      Toast.show({
        type: "error",
        text1: "please pick an photo.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "cherry", fontSize: 32, marginVertical: 32 }}>
        {`Add your \nprofile photo.`}
      </Text>

      <Pressable
        onPress={pickImage}
        style={{
          marginTop: 32,
          width: 200,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          overflow: "hidden",
          borderRadius: 32,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <Ionicons name="add" size={32} color={Colors.light.text} />
        )}
      </Pressable>

      <Pressable
        style={{
          position: "absolute",
          bottom: 80,
          width: 62,
          height: 62,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 32,

          backgroundColor: Colors.light.text,
        }}
        onPress={onStepSubmit}
      >
        <Ionicons name="arrow-forward" size={32} color="#fafafa" />
      </Pressable>
    </View>
  );
};

export default ProfilePicScreen;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    padding: 16,
    backgroundColor: Colors.light.accent,
  },
});
