import { StyleSheet, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function IconButton({ name, color, size, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Icon name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
