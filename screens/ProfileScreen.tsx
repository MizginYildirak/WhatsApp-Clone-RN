import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import ProfileInfo from "../components/ProfileInfo";
import { SettingsSectionItem } from "../components/utils/Settings";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const colors = useThemeColors();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const profileData = [
    { icon: "account-circle-outline", title: "Name", description: "Magnus Carlsen" },
    { icon: "information-outline", title: "About", description: "Mozart of Chess" },
    { icon: "phone", title: "Phone", description: "+1234567890" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileInfo
        image={image ? { uri: image } : require("../MagnusCarlsenAvatar.png")} 
        style={{ height: 200, width: 200, borderRadius: 100 }}
        onPress={pickImage} 
      />

      {profileData.map((data, index) => (
        <SettingsSectionItem
          key={index}
          icon={data.icon}
          title={data.title}
          description={data.description}
          style={{ alignSelf: "flex-start" }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
});
