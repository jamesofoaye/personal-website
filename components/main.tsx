import { Container, Flex, FlexProps } from "@chakra-ui/react";
import * as React from "react";
import { Layout } from "./layout";

export const Main = (props: FlexProps) => {
	return (
		<Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
			<Layout minW={"7xl"} bg="brand.yellow" mx={"auto"}>
				Main
			</Layout>
		</Flex>
	);
};
