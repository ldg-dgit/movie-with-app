import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [assets] = useAssets([
		require("./asset/GithubContributionsSticker.png"),
		"https://cdn.openai.com/API/images/gradient_card_1.png",
	]);
	const [fonts] = Font.useFonts(Ionicons.font);

	const onLayoutRootView = useCallback(async () => {
		if (assets || fonts) {
			await SplashScreen.hideAsync();
		}
	});

	if (!assets) {
		return null;
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			onLayout={onLayoutRootView}
		>
			<Text>Splash Screen Demo! 👋</Text>
		</View>
	);
}
