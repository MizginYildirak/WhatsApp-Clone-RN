import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Chats from "./screens/Chats";
import Updates from "./screens/Updates";
import Groups from "./screens/Groups";
import Calls from "./screens/Calls";

const BottomTabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator>
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
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}
