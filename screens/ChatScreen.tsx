import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import IconButton from "../components/UI/IconButton";
import { useChat } from "../components/store/chat-context";

interface ChatScreenProps {
  route: { params: { name: string; image: string; _id: string } };
  navigation: any;
}

const ChatScreen = ({ route, navigation }) => {
  const [messageText, setMessageText] = useState("");
  const { name, image, _id } = route.params;

  const { messages, receiveMessage, mainUser } = useChat();

  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

  const wsRef = useRef(null);

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
      headerTitleStyle: {
        fontSize: 25,
      },
    });
  }, [navigation, name, image]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.108:3000");
    wsRef.current = socket;

    socket.onopen = () => console.log("Connected to the server!");

    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        receiveMessage(receivedData.text);
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

  const sendMessageToServer = () => {
    if (messageText.trim() && wsRef.current) {
      const newMessage = {
        _id: uuid.v4(),
        user: { _id: mainUser, name: "me" },
        text: messageText,
      };

      console.log("newMessageUserid;", newMessage.user)

      wsRef.current.send(JSON.stringify(newMessage));
      setMessageText("");
    }
  };

  console.log("messajlar:", messages);
  console.log("Main User2: ", mainUser);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
              <Text style={styles.messageText}>{`${item.text}`}</Text>
              <Text style={styles.hourText}>{`${hour}:${min}`}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
          inverted
          style={styles.flatListStyle}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <IconButton name="sticker-emoji" size={30} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#888"
              value={messageText}
              onChangeText={setMessageText}
            />
            <View style={styles.iconsRow}>
              <IconButton
                name="paperclip"
                size={30}
                color="black"
                onPress={() => console.log("Dosya ekleme açıldı!")}
              />
              <IconButton
                name="camera-outline"
                size={30}
                color="black"
                onPress={() => console.log("Fotoğraf ekleme açıldı!")}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessageToServer}
          >
            <Ionicons
              name={messageText ? "send" : "mic"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 20 },
  flatListStyle: {
    marginBottom: 65,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 2,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    maxWidth: "80%",
    marginLeft: 10,
    backgroundColor: "white",
    fontWeight: "bold",
  },
  sentMessage: {
    backgroundColor: "#d8fdd2",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "black",
    fontSize: 17,
    position: "relative",
    fontWeight: "500",
  },
  hourText: {
    position: "relative",
    top: 6,
    fontSize: 12,
  },
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
