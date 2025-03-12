import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import IconButton from "../components/UI/IconButton";

const mainUser = Math.floor(Math.random() * 1000);

interface User {
  _id: number;
  name: string;
}

interface Message {
  _id: number;
  text: string;
  user: User;
}

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const { name, image, _id } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.username}>{name}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#fff",
        height: 100,
      },
      headerTintColor: "#2b9b60",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
      },
    });
  }, [navigation, name, image]);

  const wsRef = React.useRef<WebSocket | null>(null);

  console.log("mesajlarrrrr:", messages);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.108:3000");
    wsRef.current = socket;

    socket.onopen = () => console.log("Connected to the server!");

    socket.onmessage = (event) => {
      try {
        const receivedData: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [receivedData, ...prevMessages]);
      } catch (error) {
        console.error("Error parsing received message:", error);
      }
    };

    socket.onerror = (error) => console.log("WebSocket Error:", error);

    socket.onclose = () => {
      console.log("Connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (messageText.trim() && wsRef.current) {
      const messageData = {
        _id: uuid.v4(),
        user: { _id: mainUser, name: "me" },
        text: messageText,
      };
      wsRef.current.send(JSON.stringify(messageData));

      setMessageText("");
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../LightModeChatBackground.jpg")}
      resizeMode="cover"
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.user._id === mainUser
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        inverted
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <View>
            <IconButton name="sticker-emoji" size={30} color="black" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#888"
            value={messageText}
            onChangeText={setMessageText}
          />
          <View style={styles.iconsRow}>
            <View>
              <IconButton
                name="paperclip"
                size={30}
                color="black"
                onPress={() => console.log("Dosya ekleme açıldı!")}
              />
            </View>
            <View>
              <IconButton
                name="camera-outline"
                size={30}
                color="black"
                onPress={() => console.log("Fotoğraf ekleme açıldı!")}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 20 },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 50,
    maxWidth: "80%",
    marginLeft: 10,
    backgroundColor: "white",
  },
  sentMessage: {
    backgroundColor: "#4A90E2",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#8e44ad",
    alignSelf: "flex-start",
  },
  messageText: { color: "#fff", fontSize: 16 },
  inputContainer: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    gap: 6,
  },
  inputRow: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000",
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 10,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  sendButton: {
    padding: 12,
    backgroundColor: "#2b9b60",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChatScreen;
