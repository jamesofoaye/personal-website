// import { ButtonGroup, Box, IconButton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { Box, BoxProps, ButtonGroup, Text, IconButton, Stack } from "@chakra-ui/react";
import { Layout } from "./layout";

export const Footer = (props: BoxProps) => {
	return (
		<Box as="footer" role="contentinfo" {...props}>
			<Layout minH="20">
				<Stack spacing={{ base: "4", md: "5" }}>
					<Stack justify="space-between" direction="row" align="center" maxW={'7xl'} mx={'auto'} w="100%">
						<Text fontSize="sm" color="subtle">
							&copy; {new Date().getFullYear()} Ofori James Ayerakwa.
						</Text>
						<ButtonGroup variant="ghost">
							<IconButton
								as="a"
								href="#"
								aria-label="LinkedIn"
								icon={<FaLinkedin fontSize="1.25rem" />}
							/>
							<IconButton
								as="a"
								href="#"
								aria-label="GitHub"
								icon={<FaGithub fontSize="1.25rem" />}
							/>
							<IconButton
								as="a"
								href="#"
								aria-label="Twitter"
								icon={<FaTwitter fontSize="1.25rem" />}
							/>
						</ButtonGroup>
					</Stack>
				</Stack>
			</Layout>
		</Box>
	);
};
