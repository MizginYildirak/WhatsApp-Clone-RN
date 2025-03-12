import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Chats from "./screens/Chats";
import Updates from "./screens/Updates";
import Groups from "./screens/Groups";
import Calls from "./screens/Calls";
import IconButton from "./components/UI/IconButton";

const BottomTabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator
    theme={{ colors: { secondaryContainer: "green" } }}
    screenOptions={({ route }) => ({
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;
  
        if (route.name === "Chats") {
          iconName = "message-text-outline";
        } else if (route.name === "Updates") {
          iconName = "update";
        } else if (route.name === "Groups") {
          iconName = "account-group-outline";
        } else if (route.name === "Calls") {
          iconName = "phone-outline";
        }
  
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: focused ? "rgba(37, 211, 102, 0.4)" : "transparent",
              borderRadius: 14, 
              paddingHorizontal: 0, 
              width: 60,
              height: 29
            }}
          >
            <Icon name={iconName} color={focused ? "#25D366" : color} size={size} />
          </View>
        );
      },
      tabBarActiveTintColor: "rgba(0, 0, 0, 0.6)",
      tabBarInactiveTintColor: "rgba(0, 0, 0, 0.6)",
    })}
    >
      <BottomTabs.Screen name="Chats" component={Chats} />
      <BottomTabs.Screen name="Updates" component={Updates} />
      <BottomTabs.Screen name="Groups" component={Groups} />
      <BottomTabs.Screen name="Calls" component={Calls} />
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}
