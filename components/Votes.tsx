import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
	color: ${(props) => props.theme.textColorDetail};
	font-size: 10px;
`;

interface VotesProps {
	vote_average: number;
}

const Votes: React.FC<VotesProps> = ({ vote_average }) => (
	<Text>{vote_average > 0 ? `⭐️ ${vote_average} / 10` : `Coming soon`}</Text>
);

export default Votes;
