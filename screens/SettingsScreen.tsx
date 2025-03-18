import {View, Image, Text, StyleSheet} from "react-native"
import {SettingsSectionItem} from "../components/utils/Settings"

export default function SettingsScreen() {
  const settings = [
    { title: "Account", description: "Security Notifications" },
    { title: "Privacy", description: "Block contacts, disappearing messages" },
    { title: "Avatar", description: "Create, edit, profile photo" },
    { title: "Lists", description: "Manage people and groups" },
    { title: "Chats", description: "Theme, wallpapers, chat history" },
    { title: "Notifications", description: "Message, group & call tones" },
    { title: "Storage and Data", description: "Network usage, auto-download" },
    { title: "App Language", description: "English" },
    { title: "Help", description: "" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: "profile-image-url" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>User Name</Text>
      </View>
      {settings.map((setting, index) => (
        <SettingsSectionItem
          key={index}
          title={setting.title}
          description={setting.description}
          onPress={() => console.log(`${setting.title} clicked`)}
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
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  }
});
