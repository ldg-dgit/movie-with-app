import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
	padding: 0px 30px;
	flex-direction: row;
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

const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-top: 8px;
	margin-bottom: 5px;
`;

interface HMediaProps {
	poster_path: string;
	original_title: string;
	overview: string;
	release_date?: string;
	vote_average?: number;
}

const HMedia: React.FC<HMediaProps> = ({
	poster_path,
	original_title,
	overview,
	release_date,
	vote_average,
}) => {
	return (
		<HMovie>
			<Poster path={poster_path} />
			<HColumn>
				<Title>
					{original_title.slice(0, 25)}
					{original_title.length > 25 ? "..." : null}
				</Title>
				{release_date ? (
					<Release>{new Date(release_date).toLocaleDateString("ko")}</Release>
				) : null}
				{vote_average ? <Votes vote_average={vote_average} /> : null}
				<Overview>
					{overview !== "" && overview.length > 150
						? `${overview.slice(0, 150)}...`
						: overview}
				</Overview>
			</HColumn>
		</HMovie>
	);
};

export default HMedia;
