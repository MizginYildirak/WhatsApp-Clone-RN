import { View, Pressable, ViewStyle, StyleProp, TextStyle } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface IconButtonProps {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

const IconButton = ({ name, color, size, onPress, style }: IconButtonProps) => {
  const MaterialCommunity =
    MaterialCommunityIcons as unknown as React.ElementType;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      <View>
        <MaterialCommunity
          name={name}
          color={color}
          size={size}
          style={style}
        />
      </View>
    </Pressable>
  );
};

export default IconButton;
