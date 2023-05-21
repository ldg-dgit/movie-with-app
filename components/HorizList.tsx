import React from "react";
import styled from "styled-components";

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

interface HListProps {
	title: string;
}

const HList: React.FC<HListProps> = ({ title, children }) => (
	<ListContainer>
		<ListTitle>{title}</ListTitle>
		{children}
	</ListContainer>
);

export default HList;
