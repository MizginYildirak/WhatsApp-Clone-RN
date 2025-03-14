import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native"; 

const Dummy_Data = [
  {
    _id: uuid.v4(),
    name: "Bobby Fischer",
    image: "https://chessacademy.com/cdn/shop/articles/Bobby1_1200x.jpg?v=1651329629",
  },
  {
    _id: uuid.v4(),
    name: "Judit Polgar",
    image:
      "https://londonspeakerbureau.com/wp-content/uploads/2021/02/Judit_Polgar_Keynote_Speaker.jpg",
  },
];

export default function Chats() {
  const navigation = useNavigation(); 

  function renderChatsItem({ item }) {
    const openChat = () => {
      navigation.navigate("ChatScreen", { id: item._id, name: item.name, image: item.image });
    };
    return (
      <TouchableOpacity onPress={openChat} style={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
      <View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.name}>{item.name}</Text>
      </View>
      </TouchableOpacity>
    );
  }
  return (
    <FlatList 
      data={Dummy_Data}
      renderItem={renderChatsItem}
      keyExtractor={(item) => item._id}  
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
});
