import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	RefreshControl,
	ScrollView,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const TrendingScroll = styled.ScrollView`
	margin-top: 20px;
`;

const Movie = styled.View`
	margin-right: 20px;
	align-items: center;
`;

const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-top: 8px;
	margin-bottom: 5px;
`;
const Votes = styled.Text`
	color: ${(props) => props.theme.textColorDetail};
	font-size: 10px;
`;

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const HMovie = styled.View`
	padding: 0px 30px;
	flex-direction: row;
	margin-bottom: 30px;
`;

const HColumn = styled.View`
	margin-left: 15px;
	width: 80%;
`;

const Overview = styled.Text`
	color: ${(props) => props.theme.textColorDetail};
	width: 83%;
`;

const Release = styled.Text`
	color: ${(props) => props.theme.textColorDetail};
	font-size: 12px;
	margin-top: 5px;
	margin-bottom: 10px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 30px;
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
			<ListContainer>
				<TrendingScroll
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingLeft: 30 }}
				>
					{trending.map((movie) => (
						<Movie key={movie.id}>
							<Poster path={movie.poster_path} />
							<Title>
								{movie.original_title.slice(0, 13)}
								{movie.original_title.length > 13 ? "..." : null}
							</Title>
							<Votes>
								{movie.vote_average > 0
									? `⭐️ ${movie.vote_average} / 10`
									: `Coming soon`}
							</Votes>
						</Movie>
					))}
				</TrendingScroll>
			</ListContainer>
			<ComingSoonTitle>Coming Soon</ComingSoonTitle>
			{upcoming.map((movie) => (
				<HMovie key={movie.id}>
					<Poster path={movie.poster_path} />
					<HColumn>
						<Title>
							{movie.original_title.slice(0, 25)}
							{movie.original_title.length > 25 ? "..." : null}
						</Title>
						<Release>
							{new Date(movie.release_date).toLocaleDateString("ko")}
						</Release>
						<Overview>
							{movie.overview !== "" && movie.overview.length > 150
								? `${movie.overview.slice(0, 150)}...`
								: movie.overview}
						</Overview>
					</HColumn>
				</HMovie>
			))}
		</Container>
	);
};

export default Movies;
