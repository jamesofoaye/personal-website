import { Flex, FlexProps } from "@chakra-ui/react";
import { Layout } from "./layout";
import { Hero } from "./hero";

export const Main = (props: FlexProps) => {
	return (
		<Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
			<Layout>
				<Hero />
			</Layout>
		</Flex>
	);
};
