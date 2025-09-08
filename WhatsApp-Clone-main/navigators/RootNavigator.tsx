import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";

import ChatStack from "./ChatStack";
import {
  ChatScreen,
  SettingsScreen,
  ThemeScreen,
  ProfileScreen,
  IconButton,
} from "../routes/index";

import {
  ChatContextProvider,
  ProfileContextProvider,
  ThemeContextProvider,
} from "../routes/context";

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <PaperProvider>
      <ProfileContextProvider>
        <ThemeContextProvider>
          <ChatContextProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={ChatStack} />
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
                          <IconButton
                            name="video-outline"
                            size={28}
                            color="black"
                          />
                          <IconButton
                            name="phone-outline"
                            size={24}
                            color="black"
                          />
                          <IconButton
                            name="dots-vertical"
                            size={24}
                            color="black"
                          />
                        </View>
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name="ThemeScreen"
                  component={ThemeScreen}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{ headerShown: true }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ChatContextProvider>
        </ThemeContextProvider>
      </ProfileContextProvider>
    </PaperProvider>
  );
}

export default RootNavigator;
