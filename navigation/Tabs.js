import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
	<Tab.Navigator
		initialRouteName="Movie"
		screenOptions={{
			tabBarActiveTintColor: "black",
			tabBarInactiveTintColor: "white",
			tabBarStyle: { backgroundColor: "teal" },
		}}
	>
		<Tab.Screen
			name="Movie"
			component={Movie}
			options={{
				headerTitleStyle: { color: "teal" },
				headerRight: () => (
					<View>
						<Text>??</Text>
					</View>
				),
			}}
		/>
		<Tab.Screen name="Tv" component={Tv} />
		<Tab.Screen name="Search" component={Search} />
	</Tab.Navigator>
);

export default Tabs;
