import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

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

interface VMediaProps {
	poster_path: string;
	original_title: string;
	vote_average: number;
}

const VMedia: React.FC<VMediaProps> = ({
	poster_path,
	original_title,
	vote_average,
}) => (
	<Movie>
		<Poster path={poster_path} />
		<Title>
			{original_title.slice(0, 13)}
			{original_title.length > 13 ? "..." : null}
		</Title>
		<Votes vote_average={vote_average} />
	</Movie>
);

export default VMedia;
