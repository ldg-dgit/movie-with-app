import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./Styled";
import { ThemeProvider } from "styled-components";

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
	images.map((image) => {
		if (typeof image === "string") {
			return Image.prefetch(image);
		} else {
			return Asset.loadAsync(image);
		}
	});

export default function App() {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		async function prepare() {
			try {
				const fonts = loadFonts([Ionicons.font]);
				const images = loadImages([
					require("./asset/GithubContributionsSticker.png"),
					"https://cdn.openai.com/API/images/gradient_card_1.png",
				]);
				await Promise.all([...fonts, ...images]);
			} catch (e) {
				console.warn(e);
			} finally {
				setReady(true);
			}
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (ready) {
			await SplashScreen.hideAsync();
		}
	}, [ready]);

	const isDark = useColorScheme() === "dark";
	if (!ready) {
		return null;
	}

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer
				onReady={onLayoutRootView}
				theme={isDark ? DarkTheme : DefaultTheme}
			>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}
