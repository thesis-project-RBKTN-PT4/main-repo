import { View, Text, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";
import { EditProfile } from "../../screens/Profile/EditProfile";
import { Settings} from "../../screens/Profile/Settings";
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.white,
  },
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="person-outline"
              size={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
