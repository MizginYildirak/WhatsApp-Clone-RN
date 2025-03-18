import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import IconButton from "../UI/IconButton";

export const SettingsSectionItem = ({ title, description, onPress }) => (
  <View style={styles.sectionItem}>
    <TouchableOpacity onPress={onPress}>
      <IconButton />
    </TouchableOpacity>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,

  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  description: {
    fontSize: 15,
    color: "#777",
  },
});
