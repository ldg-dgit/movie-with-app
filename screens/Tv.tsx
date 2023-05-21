import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VertiMedia";
import HList, { HListSeparator } from "../components/HorizList";

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
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
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(["tv"]);
		setRefreshing(false);
	};

	return (
		<ScrollView
			contentContainerStyle={{ paddingVertical: 25 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<HList title="Trending TV" data={trendingData.results} />
			<HList title="Airing TV" data={todayData.results} />
			<HList title="Top Rated TV" data={topData.results} />
		</ScrollView>
	);
};

export default Tv;
