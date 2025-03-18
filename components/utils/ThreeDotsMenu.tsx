import React, { useState } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import IconButton from "../UI/IconButton";

export default function ThreeDotsMenu({ menuItems }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View>
      <Menu
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        anchor={
          <IconButton
            name="dots-vertical"
            size={25}
            color="black"
            onPress={() => setIsVisible(true)}
          />
        }
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={index} onPress={item.onPress} title={item.title} />
        ))}
      </Menu>
    </View>
  );
}
