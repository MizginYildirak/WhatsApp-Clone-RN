import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useChat } from "../components/store/chat-context";
import { useThemeColors } from "../components/hooks/useThemeColors.js";
import { Message } from "../components/store/chat-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ChatItem {
  user_id: string;
  name: string;
  image: string;
}

const Dummy_Data: ChatItem[] = [
  {
    user_id: uuid.v4(),
    name: "Bobby Fischer",
    image:
      "https://chessacademy.com/cdn/shop/articles/Bobby1_1200x.jpg?v=1651329629",
  },
  {
    user_id: uuid.v4(),
    name: "Judit Polgar",
    image:
      "https://londonspeakerbureau.com/wp-content/uploads/2021/02/Judit_Polgar_Keynote_Speaker.jpg",
  },
];

export default function Chats() {
  const navigation = useNavigation<NavigationProp>();
  const colors = useThemeColors();

  const { messages, receiveMessage, mainUser } = useChat()!;

  const [lastMessages, setLastMessages] = useState<{
    [chatId: string]: string | Message;
  }>({});

  console.log("sonmesajalcammessages:", messages);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    chatItem: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      fontSize: 18,
      color: colors.text,
    },
  });

  useEffect(() => {
    messages.forEach((msg) => {
      console.log("msgtype:", msg);
      const chatId = msg.chatId;
      const lastMsg = lastMessages[chatId!];

      console.log("lastMsg:", lastMessages);

      if (lastMsg && typeof lastMsg !== "string") {
        if (
          msg.time.hour > lastMsg.time.hour ||
          (msg.time.hour === lastMsg.time.hour &&
            msg.time.minute > lastMsg.time.minute)
        ) {
          setLastMessages((prevMessages) => ({
            ...prevMessages,
            [chatId!]: msg,
          }));
        }
      } else {
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [chatId!]: msg,
        }));
      }
    });
  }, [messages]);

  function renderChatsItem({ item }: { item: ChatItem }) {
    const openChat = () => {
      navigation.navigate("ChatScreen", {
        user_id: item.user_id,
        name: item.name,
        image: item.image,
      });
    };

    const lastMessage = lastMessages[item.user_id];

    return (
      <TouchableOpacity onPress={openChat} style={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.name}>
            {typeof lastMessage === "string"
              ? lastMessage
              : lastMessage?.text || "Henüz mesaj yok"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <FlatList
      data={Dummy_Data}
      renderItem={renderChatsItem}
      keyExtractor={(item) => item.user_id}
    />
  );
}
