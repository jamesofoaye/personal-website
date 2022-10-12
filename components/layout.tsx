import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface layoutProps {
	children: ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
	return (
		<Box as="main" maxW={"7xl"} mx="auto">
			{children}
		</Box>
	);
};

export default Layout;
