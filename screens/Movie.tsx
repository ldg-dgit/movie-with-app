import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
	View,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VertiMedia";
import HMedia from "../components/HorizMedia";

const API_KEY = "fea2b17df637d4f3a55228d4c0ef6c3d";

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 18px;
	font-weight: 600;
	margin-left: 30px;
	margin-bottom: 10px;
`;

const TrendingScroll = styled.FlatList`
	margin-top: 20px;
`;

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = ({}) => {
	const [loading, setLoading] = useState(true);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [trending, setTrending] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const getTrending = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
			)
		).json();
		setTrending(results);
	};
	const getUpcoming = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
			)
		).json();
		setUpcoming(results);
	};
	const getNowPlaying = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
			)
		).json();
		setNowPlaying(results);
	};
	const getData = async () => {
		await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);
	const onRefresh = async () => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	};
	return loading ? (
		<Loader>
			<ActivityIndicator size="small" />
		</Loader>
	) : (
		<Container
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<Swiper
				horizontal
				loop
				autoplay
				autoplayTimeout={3.5}
				showsPagination={false}
				showsButtons={false}
				containerStyle={{
					width: "100%",
					height: SCREEN_HEIGHT / 4,
					marginBottom: 30,
				}}
			>
				{nowPlaying.map((movie) => (
					<Slide
						key={movie.id}
						backdrop_path={movie.backdrop_path}
						poster_path={movie.poster_path}
						original_title={movie.original_title}
						vote_average={movie.vote_average}
						overview={movie.overview}
					/>
				))}
			</Swiper>
			<ListTitle>Trending Movies</ListTitle>
			<TrendingScroll
				data={trending}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 30 }}
				ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item }) => (
					<VMedia
						poster_path={item.poster_path}
						original_title={item.original_title}
						vote_average={item.vote_average}
					/>
				)}
			/>
			<ListContainer></ListContainer>
			<ComingSoonTitle>Coming Soon</ComingSoonTitle>
			{upcoming.map((movie) => (
				<HMedia
					key={movie.id}
					poster_path={movie.poster_path}
					original_title={movie.original_title}
					overview={movie.overview}
					release_date={movie.release_date}
				/>
			))}
		</Container>
	);
};

export default Movies;
