import { StyleSheet, View, Pressable, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IconButtonProps {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const IconButton = ({ name, color, size, onPress, style }: IconButtonProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <View>
        <Icon name={name} color={color} size={size} style={style} />
      </View>
    </Pressable>
  );
};

export default IconButton;
