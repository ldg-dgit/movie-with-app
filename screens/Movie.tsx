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
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HorizList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 18px;
	font-weight: 600;
	margin-left: 25px;
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

const VSeparator = styled.View`
	width: 25px;
`;

const HSeparator = styled.View`
	height: 25px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = ({}) => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const { isLoading: nowPlayinLoading, data: nowPlayingData } =
		useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
	const { isLoading: upcomingLoading, data: upcomingData } =
		useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
	const { isLoading: trendingLoading, data: trendingData } =
		useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(["movies"]);
		setRefreshing(false);
	};
	const renderVMedia = ({ item }: { item: Movie }) => (
		<VMedia
			poster_path={item.poster_path || ""}
			original_title={item.original_title}
			vote_average={item.vote_average}
		/>
	);
	const renderHMedia = ({ item }: { item: Movie }) => (
		<HMedia
			poster_path={item.poster_path || ""}
			original_title={item.original_title}
			overview={item.overview}
			release_date={item.release_date}
		/>
	);
	const movieKeyExtractor = (item: Movie) => `${item.id}`;
	const loading = nowPlayinLoading || upcomingLoading || trendingLoading;
	return loading ? (
		<Loader />
	) : upcomingData ? (
		<FlatList
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListHeaderComponent={
				<>
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
							marginBottom: 25,
						}}
					>
						{nowPlayingData?.results.map((movie) => (
							<Slide
								key={movie.id}
								backdrop_path={movie.backdrop_path || ""}
								poster_path={movie.poster_path || ""}
								original_title={movie.original_title}
								vote_average={movie.vote_average}
								overview={movie.overview}
							/>
						))}
					</Swiper>
					{trendingData ? (
						<HList title="Trending Movies" data={trendingData?.results} />
					) : null}
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={movieKeyExtractor}
			ItemSeparatorComponent={HSeparator}
			renderItem={renderHMedia}
		/>
	) : null;
};

export default Movies;
