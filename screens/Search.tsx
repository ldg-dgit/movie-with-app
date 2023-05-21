import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
	background-color: white;
	padding: 10px 30px;
	border-radius: 15px;
	width: 90%;
	margin: 10px auto;
`;

const Search = () => {
	const [query, setQuery] = useState("");
	const onChangeText = (text: string) => setQuery(text);
	return (
		<Container>
			<SearchBar
				placeholder="Search for Movie or TV Show"
				placeholderTextColor="grey"
				returnKeyType="search"
				onChangeText={onChangeText}
			/>
		</Container>
	);
};

export default Search;
