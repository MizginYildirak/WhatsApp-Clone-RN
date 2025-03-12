import { StyleSheet, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function IconButton({ name, color, size, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <View>
        <Icon name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
