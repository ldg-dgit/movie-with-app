import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Movie = ({ navigation: { navigate } }) => (
	<TouchableOpacity
		style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		onPress={() => navigate("Stack", { screen: "One" })}
	>
		<Text>Movie</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	btn: {
		flex: 1,
		justifyContent: "center",
	},
});

export default Movie;
