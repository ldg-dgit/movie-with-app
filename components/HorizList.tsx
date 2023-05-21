import React from "react";
import styled from "styled-components";
import VMedia from "./VertiMedia";
import { FlatList } from "react-native";

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 18px;
	font-weight: 600;
	margin-left: 25px;
	margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
	width: 25px;
`;

interface HListProps {
	title: string;
	data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
	<ListContainer>
		<ListTitle>{title}</ListTitle>
		<FlatList
			data={data}
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={HListSeparator}
			contentContainerStyle={{ paddingHorizontal: 25 }}
			keyExtractor={(item) => `${item.id}`}
			renderItem={({ item }) => (
				<VMedia
					poster_path={item.poster_path}
					original_title={item.original_title ?? item.original_name}
					vote_average={item.vote_average}
				/>
			)}
		/>
	</ListContainer>
);

export default HList;
