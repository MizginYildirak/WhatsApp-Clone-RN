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
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import * as ImagePicker from "expo-image-picker";

interface ChatScreenParams {
  name: string;
  image: string;
  user_id: string;
}

type ChatScreenRouteProp = RouteProp<RootStackParamList, "ChatScreen">;

type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ChatScreen"
>;

const ChatScreen = () => {
  const [messageText, setMessageText] = useState("");
  const [imageUri, setImageUri] = useState("");
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const route = useRoute<ChatScreenRouteProp>();
  const { name, image, user_id } = route.params;

  const { messages, receiveMessage, mainUser } = useChat()!;
  const wsRef = useRef<WebSocket | null>(null);
  const colors = useThemeColors();

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera permission is needed");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
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
      backgroundColor: colors.background,
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
      backgroundColor: colors.background,
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.username}>{name}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 25,
      },
    });
  }, [navigation, name, image]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.101:3000");
    wsRef.current = socket;

    socket.onopen = () => console.log("Connected to the server!");

    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        receiveMessage(
          user_id,
          receivedData.text,
          receivedData.messageImg || ""
        );
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
    if ((messageText.trim() || imageUri) && wsRef.current) {
      const newMessage = {
        _id: uuid.v4(),
        messageImg: imageUri,
        user: { _id: mainUser, name: "me" },
        text: messageText,
        chatId: user_id,
      };

      wsRef.current.send(JSON.stringify(newMessage));
      setMessageText("");
      setImageUri("");
    }
  };

  const filteredChatMessages = messages.filter(
    (message) => message.chatId === user_id
  );

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
          data={filteredChatMessages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.user._id === mainUser
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}
            >
              {item.messageImg ? (
                <Image
                  source={{ uri: item.messageImg }}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
              ) : null}
              <Text style={styles.messageText}>{item.text}</Text>
              {item.time && (
                <Text style={styles.hourText}>
                  {`${item.time.hour}:${item.time.minute}`}
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
          inverted
          style={styles.flatListStyle}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <IconButton name="sticker-emoji" size={30} color={colors.text} />
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
                color={colors.text}
                onPress={() => console.log("Dosya ekleme açıldı!")}
              />
              <IconButton
                name="camera-outline"
                size={30}
                color={colors.text}
                onPress={takePhoto}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessageToServer}
          >
            <IconButton
              name={messageText ? "send" : "microphone"}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
