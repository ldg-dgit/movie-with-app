import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View, useColorScheme } from "react-native";
import { BLACK_COLOR, GREEN_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === "dark";
	return (
		<Tab.Navigator
			initialRouteName="Movie"
			screenOptions={{
				tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
				tabBarActiveTintColor: isDark ? GREEN_COLOR : "green",
				tabBarInactiveTintColor: isDark ? "#aaaaaa" : "#666666",
				headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
				headerTitleStyle: {
					color: isDark ? "#ffffff" : BLACK_COLOR,
				},
			}}
		>
			<Tab.Screen name="Movie" component={Movie} options={{}} />
			<Tab.Screen name="Tv" component={Tv} />
			<Tab.Screen name="Search" component={Search} />
		</Tab.Navigator>
	);
};

export default Tabs;
