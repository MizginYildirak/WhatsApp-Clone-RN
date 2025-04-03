import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SettingsSectionItem } from "../components/utils/Settings";
import { useTheme } from "../components/store/theme-context";
import { useThemeColors } from "../components/hooks/useThemeColors.js";

export default function ThemeScreen() {
  const { isDarkMode, setIsDarkMode } = useTheme()!;
  const colors = useThemeColors();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<string>("Light");

  const themeItems = [
    {
      icon: "brightness-5",
      title: "Theme",
      description: selectedTheme,
    },
    {
      icon: "palette",
      title: "Privacy",
      description: "Default",
    },
  ];

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setModalVisible(false);

    if (theme === "Dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.textStyle, { color: colors.text }]}>Display</Text>
      <View style={styles.sectionContainer}>
        {themeItems.map((themeItem, index) => (
          <SettingsSectionItem
            key={index}
            icon={themeItem.icon}
            title={themeItem.title}
            description={themeItem.description || "Not specified"}
            onPress={() => setModalVisible(true)}
          />
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={{ flex: 1, height: "100%" }}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={[styles.modalText, { color: colors.text }]}>
              Choose Theme
            </Text>
            <View style={styles.modalItemsContainer}>
              {["System default", "Light", "Dark"].map((theme, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => handleThemeSelect(theme)}
                >
                  <Text style={{ color: colors.text }}>{theme}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button title="Kapat" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    height: "100%",
  },
  sectionContainer: {
    paddingVertical: 18,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: 300,
    padding: 20,

    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItemsContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  modalItem: {
    paddingVertical: 12,
    alignItems: "center",
  },
});
