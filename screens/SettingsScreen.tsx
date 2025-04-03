import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import  SettingsSectionItem  from "../components/utils/Settings";
import { useNavigation } from "@react-navigation/native";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import { useProfile } from "../components/store/profile-context";
import ProfileInfo from "../components/ProfileInfo";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const colors = useThemeColors();
  const profileImage = useProfile()?.profileImage;

  console.log("profileImage:", profileImage); 
  

  const settings = [
    {
      icon: "key-outline",
      title: "Account",
      description: "Security, notifications, change number",
    },
    {
      icon: "lock-outline",
      title: "Privacy",
      description: "Block contacts, disappearing messages",
    },
    {
      icon: "account-circle-outline",
      title: "Avatar",
      description: "Create, edit, profile photo",
    },
    {
      icon: "format-list-bulleted",
      title: "Lists",
      description: "Manage people and groups",
    },
    {
      icon: "chat-outline",
      title: "Chats",
      description: "Theme, wallpapers, chat history",
    },
    {
      icon: "bell-outline",
      title: "Notifications",
      description: "Message, group & call tones",
    },
    {
      icon: "cloud-outline",
      title: "Storage and Data",
      description: "Network usage, auto-download",
    },
    { icon: "translate", title: "App Language", description: "English" },
    { icon: "help", title: "Help", description: "" },
  ];

  const screenMapping: { [key: string]: string } = {
    Chats: "ThemeScreen",
    Account: "AccountScreen",
    Privacy: "PrivacyScreen",
    Avatar: "AvatarScreen",
    Lists: "ListsScreen",
    Notifications: "NotificationsScreen",
    "Storage and Data": "StorageScreen",
    "App Language": "LanguageScreen",
    Help: "HelpScreen",
  };
  

  const openProfileInfo = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileInfo
        image={profileImage}
        name="Magnus Carlsen"
        status="Mozart of Chess"
        onPress={() => navigation.navigate("Profile")}
      />

      {settings.map((setting, index) => (
        <SettingsSectionItem
          key={index}
          icon={setting.icon}
          title={setting.title}
          description={setting.description}
          onPress={() => {
            const screenName = screenMapping[setting.title];
            if (screenName) {
              navigation.navigate(screenName);
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
