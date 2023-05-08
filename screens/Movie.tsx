import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
`;

const Movie: React.FC<NativeStackScreenProps<any, "Movie">> = ({
	navigation: { navigate },
}) => (
	<Btn
		style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		onPress={() => navigate("Stack", { screen: "One" })}
	>
		<Title>Movie</Title>
	</Btn>
);

export default Movie;
