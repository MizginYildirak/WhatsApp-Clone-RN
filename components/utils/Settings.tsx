import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IconButton from "../UI/IconButton";
import { useThemeColors } from "../hooks/useThemeColors.js";

export const SettingsSectionItem = ({ title, description, onPress, icon, style }) => {
  const colors = useThemeColors()

  return (
    <TouchableOpacity onPress={onPress} style={[styles.sectionItem, style, { backgroundColor: colors.background }]}>
      <IconButton name={icon} style={{ fontSize: 18, color: colors.text }} />
      <View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 10,
    gap: 30,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  description: {
    fontSize: 15,
  },
});
