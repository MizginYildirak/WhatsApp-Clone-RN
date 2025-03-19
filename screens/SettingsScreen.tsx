import { View, Image, Text, StyleSheet } from "react-native";
import { SettingsSectionItem } from "../components/utils/Settings";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  
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

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={require("../MagnusCarlsenAvatar.png")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Magnus Carlsen</Text>
          <Text style={styles.profileStatus}>Mozart of Chess</Text>
        </View>
      </View>
      {settings.map((setting, index) => (
        <SettingsSectionItem
          key={index}
          icon={setting.icon}
          title={setting.title}
          description={setting.description}
          onPress={() => {
            if (setting.title === "Chats") {
              console.log("basıyorummmm")
              navigation.navigate("ThemeScreen");
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
    backgroundColor: "white",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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
