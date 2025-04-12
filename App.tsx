import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  ChatContextProvider,
  ThemeContextProvider,
  ProfileContextProvider,
} from "./routes/context";

import {
  Chats,
  Updates,
  Groups,
  Calls,
  ChatScreen,
  SettingsScreen,
  ThemeScreen,
  ProfileScreen,
  ThreeDotsMenu,
  useThemeColors,
  IconButton
} from "./routes/index";

import { Provider as PaperProvider } from "react-native-paper";

import { Camera, Search, MoreVertical } from "react-native-feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  Profile: undefined;
  ChatScreen: { user_id: string; name: string; image: string };
  Settings: undefined;
};

const BottomTabs = createBottomTabNavigator();

function BottomTabNavigator() {
  const colors = useThemeColors();
  const navigation = useNavigation<NavigationProps>();

  console.log("colors:", colors);

  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: {
          height: 72,
          paddingTop: 16,
          paddingBottom: 5,
          backgroundColor: colors.background,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = "";

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
                backgroundColor: focused ? colors.primaryLight : "transparent",
                borderRadius: 20,
                width: 78,
                height: 36,
                marginBottom: 10,
              }}
            >
              <IconButton
                name={iconName}
                color={focused ? "#2b9b60" : color}
                size={27}
              />
            </View>
          );
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      })}
    >
      <BottomTabs.Screen
        name="Chats"
        component={Chats}
        options={{
          title: "WhatsApp",
          headerStyle: {
            height: 95,
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerRight: () => {
            const menuItems = [
              {
                title: "New Group",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "New broadcast",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Linked devices",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Starred messages",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Settings",
                onPress: () => navigation.navigate("Settings"),
              },
            ];
            return (
              <View
                style={{
                  flexDirection: "row",
                  gap: 25,
                  marginRight: 25,
                }}
              >
                <IconButton
                  name="camera-outline"
                  size={25}
                  color={colors.text}
                />
                <IconButton name="magnify" size={25} color={colors.text} />
                <ThreeDotsMenu menuItems={menuItems} />
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
            const menuItems = [
              {
                title: "Create Channel",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Status Privacy",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Settings",
                onPress: () => console.log("Option 1 is pressed"),
              },
            ];
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="magnify" size={25} color={colors.text} />
                <ThreeDotsMenu menuItems={menuItems} />
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
            const menuItems = [
              {
                title: "Settings",
                onPress: () => console.log("Option 1 is pressed"),
              },
            ];
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <ThreeDotsMenu menuItems={menuItems} />
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
            const menuItems = [
              {
                title: "Clear call logs",
                onPress: () => console.log("Option 1 is pressed"),
              },
              {
                title: "Settings",
                onPress: () => console.log("Option 1 is pressed"),
              },
            ];
            return (
              <View style={{ marginRight: 15, flexDirection: "row", gap: 25 }}>
                <IconButton name="magnify" size={25} color={colors.text} />
                <ThreeDotsMenu menuItems={menuItems} />
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

export default function App() {
  return <RootNavigator />;
}
