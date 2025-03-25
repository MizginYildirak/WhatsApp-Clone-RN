import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import { useProfile } from "../components/store/profile-context";

export default function ProfileInfo({ name, status, image, onPress, style }) {
  const colors = useThemeColors();
  const { profileImage } = useProfile();

  console.log("Profile Image:", profileImage);

  return (
    <TouchableOpacity
      style={[styles.profileInfo, { backgroundColor: colors.background }]}
      onPress={onPress}
    >
      <Image
        source={
          typeof profileImage === "string"
            ? { uri: profileImage }
            : profileImage
        }
        style={[styles.profileImage, style]}
      />
      <View>
        <Text style={[styles.profileName, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.profileStatus, { color: colors.text }]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    padding: 10,
    borderRadius: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
  },
  profileStatus: {
    fontSize: 15,
  },
});
