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

const Poster = styled.Image`
	width: 100px;
	height: 160px;
	border-radius: 5px;
`;

const Title = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: white;
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
	color: rgba(255, 255, 255, 0.8);
	margin-top: 10px;
	font-size: 13px;
`;

const Votes = styled(Overview)`
	font-size: 14px;
`;

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
							intensity={50}
							tint={isDark ? "dark" : "light"}
						>
							<Wrapper>
								<Poster source={{ uri: makeImgPath(movie.poster_path) }} />
								<Column>
									<Title>{movie.original_title}</Title>
									{movie.vote_average > 0 ? (
										<Votes>{movie.vote_average} / 10 ⭐️</Votes>
									) : null}
									<Overview>{movie.overview.slice(0, 100)}...</Overview>
								</Column>
							</Wrapper>
						</BlurView>
					</View>
				))}
			</Swiper>
		</Container>
	);
};

export default Movie;
