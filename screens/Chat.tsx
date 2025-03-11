import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import uuid from "react-native-uuid"

const mainUser = Math.floor(Math.random() * 1000)

interface User {
  _id: number
  name: string
}

interface Message {
  _id: number
  text: string
  user: User
}

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState<string>("")

  //Without changing the WebSocket itself, we can handle events like onopen, onmessage, onerror without rendering process.

  const wsRef = React.useRef<WebSocket | null>(null) 

  console.log("mesajlarrrrr:", messages)

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.108:3000")
    wsRef.current = socket

    
    // when the component is first opened
    socket.onopen = () => console.log("Connected to the server!")

    // a message comes from the server, it comes as JSON and we change it to an object
    socket.onmessage = (event) => {
      try {
        const receivedData: Message = JSON.parse(event.data) // parse changes to an object
        setMessages((prevMessages) => [receivedData, ...prevMessages])
      } catch (error) {
        console.error("Error parsing received message:", error)
      }
    }

    socket.onerror = (error) => console.log("WebSocket Error:", error)

    socket.onclose = () => {
      console.log("Connection closed.")
    }

    return () => {
      socket.close()
    }
  }, [])

  const sendMessage = () => {
    if (messageText.trim() && wsRef.current) {
      const messageData = {
        _id: uuid.v4(), 
        user: { _id: mainUser, name: "me" },
        text: messageText,
      }
        // sending the messageData to the server
      wsRef.current.send(JSON.stringify(messageData))

      setMessageText("")
    }
  }

  return (
    <View style={styles.container}>
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
        <TextInput
          style={styles.input}
          placeholder="Write your message..."
          placeholderTextColor="#888"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 20 },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    maxWidth: "80%",
    marginLeft: 10,
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    fontSize: 16,
    color: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ChatApp
