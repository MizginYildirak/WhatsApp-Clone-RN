import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import uuid from "react-native-uuid";

export interface Message {
  _id: string;
  messageImg: string;
  user: { _id: number; name: string };
  text: string;
  to?: string;
  time: { hour: string; minute: string };
  chatId?: string;
}

interface ChatContextType {
  messages: Message[];
  receiveMessage: (chatId: string, text: string, messageImg: string) => void;
  mainUser: number; 
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatContextProvider: React.FC<ChatProviderProps> = ({
  children,
}) => {
  const [messagesByChat, setMessagesByChat] = useState<{ [chatId: string]: Message[] }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [mainUser] = useState<number>(() => Math.floor(Math.random() * 1000));
 
  const receiveMessage = (chatId: string, text: string, messageImg: string = "") => {
    const date = new Date();
    const currentHour = String(date.getHours()).padStart(2, "0");
    const currentMinute = String(date.getMinutes()).padStart(2, "0");

    const newMessage: Message = {
      _id: uuid.v4() as string,
      messageImg: messageImg,
      user: { _id: mainUser, name: "me" },
      text,
      time: { hour: currentHour, minute: currentMinute },
      chatId: chatId
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <ChatContext.Provider value={{ messages, receiveMessage, mainUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};