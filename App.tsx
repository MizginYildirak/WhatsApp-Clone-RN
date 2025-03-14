import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {ChatContextProvider} from "./components/store/chat-context"
import Chats from "./screens/Chats";
import Updates from "./screens/Updates";
import Groups from "./screens/Groups";
import Calls from "./screens/Calls";
import ChatScreen from "./screens/ChatScreen";
import IconButton from "./components/UI/IconButton";
import { camera, Search, MoreVertical } from "react-native-feather";

const BottomTabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { height: 72, paddingTop: 16, paddingBottom: 5 },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Chats") {
            iconName = "message-text";
          } else if (route.name === "Updates") {
            iconName = "update";
          } else if (route.name === "Groups") {
            iconName = "account-group";
          } else if (route.name === "Calls") {
            iconName = "phone"; 
          }

          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(37, 211, 102, 0.3)"
                  : "transparent",
                borderRadius: 20,
                width: 78,
                height: 36,
                marginBottom: 10,
              }}
            >
              <Icon
                name={iconName}
                color={focused ? "#2b9b60" : color}
                size={27}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "rgba(0, 0, 0, 0.6)",
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.6)",
      })}
    >
      <BottomTabs.Screen
        name="Chats"
        component={Chats}
        options={{
          title: "WhatsApp",
          headerStyle: {
            height: 95,
            backgroundColor: "white",
          },
          headerTintColor: "#2b9b60",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="camera-outline" size={25} color="black" />
                <IconButton name="magnify" size={25} color="black" />
                <IconButton name="dots-vertical" size={24} color="black" />
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Updates"
        component={Updates}
        options={{
          headerTitleStyle: {
            fontSize: 25,
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="magnify" size={25} color="black" />
                <IconButton name="dots-vertical" size={24} color="black" />
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Groups"
        component={Groups}
        options={{
          headerTitleStyle: {
            fontSize: 25,
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="dots-vertical" size={24} color="black" />
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Calls"
        component={Calls}
        options={{
          headerTitleStyle: {
            fontSize: 25,
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="magnify" size={25} color="black" />
                <IconButton name="dots-vertical" size={24} color="black" />
              </View>
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <ChatContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ChatStack} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            headerRight: () => {
              return (
                <View
                  style={{
                    marginRight: 15,
                    flexDirection: "row",
                    gap: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton name="video-outline" size={28} color="black" />
                  <IconButton name="phone-outline" size={24} color="black" />
                  <IconButton name="dots-vertical" size={24} color="black" />
                </View>
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ChatContextProvider>
  );
}

export default function App() {
  return <RootNavigator />;
}
