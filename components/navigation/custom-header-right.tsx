import React from "react";
import { View } from "react-native";

import { ThreeDotsMenu, IconButton } from "../../routes/index";

interface MenuItem {
  title: string;
  onPress: () => void;
}

interface CustomHeaderRightProps {
  menuItems: MenuItem[];
  children?: React.ReactNode;
  withCamera?: boolean;
  withSearch?: boolean;
}

const CustomHeaderRight: React.FC<CustomHeaderRightProps> = ({
  menuItems,
  children,
  withCamera,
  withSearch,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        marginRight: 15,
      }}
    >
      {children}

      {withCamera && (
        <IconButton name="camera-outline" size={25} color="black" />
      )}
      {withSearch && <IconButton name="magnify" size={25} color="black" />}
      <ThreeDotsMenu menuItems={menuItems} />
    </View>
  );
};

export default CustomHeaderRight;
