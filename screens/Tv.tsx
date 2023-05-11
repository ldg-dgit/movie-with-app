import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VertiMedia";

const Tv = () => {
	const { isLoading: todayLoading, data: todayData } = useQuery(
		["tv", "today"],
		tvApi.airingToday
	);
	const { isLoading: topLoading, data: topData } = useQuery(
		["tv", "top"],
		tvApi.topRated
	);
	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		["tv", "trending"],
		tvApi.trending
	);
	const loading = todayLoading || topLoading || trendingLoading;
	if (loading) {
		return <Loader />;
	}
	return (
		<ScrollView>
			<FlatList
				data={trendingData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						poster_path={item.poster_path}
						original_title={item.original_name}
						vote_average={item.vote_average}
					/>
				)}
			/>
			<FlatList
				data={todayData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						poster_path={item.poster_path}
						original_title={item.original_name}
						vote_average={item.vote_average}
					/>
				)}
			/>
			<FlatList
				data={topData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						poster_path={item.poster_path}
						original_title={item.original_name}
						vote_average={item.vote_average}
					/>
				)}
			/>
		</ScrollView>
	);
};

export default Tv;
