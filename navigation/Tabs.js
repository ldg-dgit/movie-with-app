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
		<Tab.Navigator
			initialRouteName="Movie"
			screenOptions={{
				unmountOnBlur: false,
				tabBarLabelStyle: {
					marginTop: -5,
					fontWeight: 600,
				},
			}}
		>
			<Tab.Screen
				name="Movie"
				component={Movie}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? "film" : "film-outline"}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="TV"
				component={Tv}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? "tv" : "tv-outline"}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? "search" : "search-outline"}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
