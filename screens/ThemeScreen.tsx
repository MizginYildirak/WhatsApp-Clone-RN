import { StyleSheet, Text, View, Modal, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SettingsSectionItem } from "../components/utils/Settings";

export default function ThemeScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const themeItems = [
    {
      icon: "brightness-5",
      title: "Theme",
      description: "Light",
    },
    {
      icon: "palette",
      title: "Privacy",
      description: "Default",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Display</Text>
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

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Android geri butonu için
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tema Seçenekleri</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Arkayı hafif karartma efekti
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

