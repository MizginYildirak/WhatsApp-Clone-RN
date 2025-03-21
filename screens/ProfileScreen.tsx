import { View, StyleSheet } from "react-native";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import ProfileInfo from "../components/ProfileInfo";
import { SettingsSectionItem } from "../components/utils/Settings";

export default function ProfileScreen() {
  const colors = useThemeColors();

  const profileData = [
    { icon: "account-circle-outline", title: "Name", description: "Magnus Carlsen" },
    { icon: "information-outline", title: "About", description: "Mozart of Chess" },
    { icon: "phone", title: "Phone", description: "+1234567890" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileInfo
        image={require("../MagnusCarlsenAvatar.png")}
        style={{ height: 200, width: 200, borderRadius: 100 }}
        onPress={() => console.log("Profile Pressed")}
      />

      {profileData.map((data, index) => {
        return (
          <SettingsSectionItem
            key={index}
            icon={data.icon}
            title={data.title}
            description={data.description}
            style={{alignItems: "flex-start"}}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
});
