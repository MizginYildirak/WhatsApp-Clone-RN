import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import ProfileInfo from "../components/ProfileInfo";
import { SettingsSectionItem } from "../components/utils/Settings";
import * as ImagePicker from "expo-image-picker";
import { useProfile } from "../components/store/profile-context";
import * as MediaLibrary from "expo-media-library";

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { profileImage, setProfileImage } = useProfile();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [inputs, setInputs] = useState({
    name: "Magnus Carlsen",
    status: "Mozart of Chess",
  });

  const requestPermissions = async () => {
    if (status !== "granted") {
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus === "granted") {
        console.log("Permission granted!");
        pickImage();
      } else {
        console.log("Permission denied!");
      }
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("result", result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const profileData = [
    {
      icon: "account-circle-outline",
      title: "Name",
      description: inputs.name,
    },
    {
      icon: "information-outline",
      title: "About",
      description: inputs.status,
    },
    { icon: "phone", title: "Phone", description: "+1234567890" },
  ];

  const openModal = (field) => {
    setSelectedField(field);
    setTempInput(inputs[field === "Name" ? "name" : "status"]);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!tempInput.trim()) {
      console.log("Input boş olamaz!");
      return;
    }

    setInputs((prev) => ({
      ...prev,
      [selectedField === "Name" ? "name" : "status"]: tempInput,
    }));

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileInfo
        image={profileImage}
        style={{ height: 200, width: 200, borderRadius: 100 }}
        onPress={requestPermissions}
      />

      {profileData.map((data, index) => (
        <SettingsSectionItem
          key={index}
          icon={data.icon}
          title={data.title}
          description={data.description}
          style={{ alignSelf: "flex-start" }}
          onPress={
            data.title === "Name" || data.title === "About"
              ? () => openModal(data.title)
              : undefined
          }
        />
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedField === "Name"
                ? "Enter Your Name"
                : "Enter Your Status"}
            </Text>

            <TextInput
              style={styles.input}
              value={tempInput}
              onChangeText={setTempInput}
              autoFocus={true}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleCancel} style={styles.button}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", height: "100%" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#2b9b60",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 20,
  },
  button: {
    padding: 10,
    alignItems: "center",
  },
  cancelButton: {
    color: "red",
    fontSize: 16,
  },
  saveButton: {
    color: "blue",
    fontSize: 16,
  },
});

export default ProfileScreen;
