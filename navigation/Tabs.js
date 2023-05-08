import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View, useColorScheme } from "react-native";
import { BLACK_COLOR, GREEN_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	return (
		<Tab.Navigator initialRouteName="Movie">
			<Tab.Screen
				name="Movie"
				component={Movie}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Ionicons name="film" color={color} size={size} />;
					},
				}}
			/>
			<Tab.Screen
				name="Tv"
				component={Tv}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Ionicons name="tv" color={color} size={size} />;
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Ionicons name="search" color={color} size={size} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
