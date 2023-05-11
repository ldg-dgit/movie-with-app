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
import { useQuery } from "react-query";
import { moviesApi } from "../api";

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

const VSeparator = styled.View`
	width: 30px;
`;

const HSeparator = styled.View`
	height: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = ({}) => {
	const {
		isLoading: nowPlayinLoading,
		data: nowPlayingData,
		refetch: refetchNowPlaying,
		isRefetching: isRefetchingNowPlaying,
	} = useQuery("nowPlaying", moviesApi.nowPlaying);
	const {
		isLoading: upcomingLoading,
		data: upcomingData,
		refetch: refetchUpcoming,
		isRefetching: isRefetchingUpcoming,
	} = useQuery("nowPlaying", moviesApi.upcoming);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		refetch: refetchTrending,
		isRefetching: isRefetchingTrending,
	} = useQuery("nowPlaying", moviesApi.trending);
	const onRefresh = async () => {
		refetchNowPlaying();
		refetchUpcoming();
		refetchTrending();
	};
	const renderVMedia = ({ item }) => (
		<VMedia
			poster_path={item.poster_path}
			original_title={item.original_title}
			vote_average={item.vote_average}
		/>
	);
	const renderHMedia = ({ item }) => (
		<HMedia
			poster_path={item.poster_path}
			original_title={item.original_title}
			overview={item.overview}
			release_date={item.release_date}
		/>
	);
	const movieKeyExtractor = (item) => `${item.id}`;
	const loading = nowPlayinLoading || upcomingLoading || trendingLoading;
	const refreshing =
		isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
	return loading ? (
		<Loader>
			<ActivityIndicator size="small" />
		</Loader>
	) : (
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
							marginBottom: 30,
						}}
					>
						{nowPlayingData.results.map((movie) => (
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
						data={trendingData.results}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 30 }}
						ItemSeparatorComponent={VSeparator}
						keyExtractor={movieKeyExtractor}
						renderItem={renderVMedia}
					/>
					<ListContainer></ListContainer>
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={movieKeyExtractor}
			ItemSeparatorComponent={HSeparator}
			renderItem={renderHMedia}
		/>
	);
};

export default Movies;
