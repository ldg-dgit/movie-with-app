import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

const API_KEY = "fea2b17df637d4f3a55228d4c0ef6c3d";

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
	flex: 1;
`;

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const BgImg = styled.Image``;

const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movie">> = ({}) => {
	const isDark = useColorScheme() === "dark";
	const [loading, setLoading] = useState(true);
	const [nowPlaying, setNowPlaying] = useState([]);
	const getNowPlaying = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
			)
		).json();
		setNowPlaying(results);
		setLoading(false);
	};
	useEffect(() => {
		getNowPlaying();
	}, []);
	return loading ? (
		<Loader>
			<ActivityIndicator size="small" />
		</Loader>
	) : (
		<Container>
			<Swiper
				horizontal
				loop
				autoplay
				autoplayTimeout={3.5}
				showsPagination={false}
				showsButtons={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				{nowPlaying.map((movie) => (
					<View key={movie.id}>
						<BgImg
							source={{ uri: makeImgPath(movie.backdrop_path) }}
							style={StyleSheet.absoluteFill}
						></BgImg>
						<BlurView
							style={StyleSheet.absoluteFill}
							intensity={10}
							tint={isDark ? "dark" : "light"}
						>
							<Title>{movie.original_title}</Title>
						</BlurView>
					</View>
				))}
			</Swiper>
		</Container>
	);
};

export default Movie;
