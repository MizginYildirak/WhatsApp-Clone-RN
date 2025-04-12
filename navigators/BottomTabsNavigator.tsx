import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { View } from "react-native";

import {
  Chats,
  Updates,
  Groups,
  Calls,
  useThemeColors,
  CustomHeaderRight,
  IconButton,
} from "../routes/index";

export type RootStackParamList = {
  Profile: undefined;
  ChatScreen: { user_id: string; name: string; image: string };
  Settings: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

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
              <CustomHeaderRight
                menuItems={menuItems}
                withCamera={true}
                withSearch={true}
              />
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
              <CustomHeaderRight menuItems={menuItems} withSearch={true} />
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
            return <CustomHeaderRight menuItems={menuItems} />;
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
              <CustomHeaderRight menuItems={menuItems} withSearch={true} />
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomTabNavigator;
