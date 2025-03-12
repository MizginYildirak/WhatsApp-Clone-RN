import { StyleSheet, View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <MaterialCommunityIcons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
