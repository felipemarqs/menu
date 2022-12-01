import React from "react";
import { Text } from "../components/Text";
import {
	Container,
	CategoriesContainer,
	MenuContainer,
	Footer,
	FooterContainer,
} from "./styles";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { Categories } from "../components/Categories";

export function Main() {
	return (
		<>
			<Container>
				<Header />

				<CategoriesContainer>
					<Categories />
				</CategoriesContainer>

				<MenuContainer>
					<Menu />
				</MenuContainer>
			</Container>

			<Footer>
				<FooterContainer>
					<Text> Footer </Text>
				</FooterContainer>
			</Footer>
		</>
	);
}
