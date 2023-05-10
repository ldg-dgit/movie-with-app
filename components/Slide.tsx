import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.View`
	flex-direction: row;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const Column = styled.View`
	width: 50%;
	margin-left: 15px;
`;

const Overview = styled.Text`
	color: ${(props) => props.theme.textColorDetail};
	margin-top: 10px;
	font-size: 13px;
`;

const Votes = styled(Overview)`
	font-size: 14px;
`;

interface SlideProps {
	backdrop_path: string;
	poster_path: string;
	original_title: string;
	vote_average: number;
	overview: string;
}

const Slide: React.FC<SlideProps> = ({
	backdrop_path,
	poster_path,
	original_title,
	vote_average,
	overview,
}) => {
	const isDark = useColorScheme() === "dark";
	return (
		<View style={{ flex: 1 }}>
			<BgImg
				source={{ uri: makeImgPath(backdrop_path) }}
				style={StyleSheet.absoluteFill}
			></BgImg>
			<BlurView
				style={StyleSheet.absoluteFill}
				intensity={100}
				tint={isDark ? "dark" : "light"}
			>
				<Wrapper>
					<Poster path={poster_path} />
					<Column>
						<Title>{original_title}</Title>
						{vote_average > 0 ? <Votes>{vote_average} / 10 ⭐️</Votes> : null}
						<Overview>{overview.slice(0, 100)}...</Overview>
					</Column>
				</Wrapper>
			</BlurView>
		</View>
	);
};

export default Slide;
