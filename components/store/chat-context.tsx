import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import uuid from "react-native-uuid";

interface Message {
  _id: string;
  user: { _id: number; name: string };
  text: string;
  time: { hour: number; minute: number };
}

interface ChatContextType {
  messages: Message[];
  receiveMessage: (text: string) => void;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [mainUser] = useState<number>(() => Math.floor(Math.random() * 1000));

  const receiveMessage = (text: string) => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();

    const newMessage: Message = {
      _id: uuid.v4() as string,
      user: { _id: mainUser, name: "me" },
      text,
      time: { hour: currentHour, minute: currentMinute },
    };

    console.log("newMessageUserid2;", newMessage.user);
    console.log("Main User: ", mainUser);

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
