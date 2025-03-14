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

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mainUser] = useState(() => Math.floor(Math.random() * 1000));

  const receiveMessage = (text: string) => {
    const newMessage: Message = {
      _id: uuid.v4() as string,
      user: { _id: mainUser, name: "me" },
      text,
    };


    console.log("newMessageUserid2;", newMessage.user)
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
