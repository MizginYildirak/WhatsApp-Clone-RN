import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNavigator } from "../routes/index";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
