import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ThemeScreen() {
  return (
    <View>
      <Text>Display</Text>
      <View>
        <View></View>
        <View>
          <Text>Theme</Text>
          <Text>Light</Text>
        </View>
        <View>
          <Text>Default chat theme</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
