import { ButtonGroup, Box, IconButton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => (
	<Box as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
		<Stack spacing={{ base: "4", md: "5" }}>
			<Stack justify="space-between" direction="row" align="center">
				<Image src="/my-logo.png" alt="Logo" width={300} height={100} objectFit={"contain"} />
				<ButtonGroup variant="ghost">
					<IconButton
						as="a"
						href="#"
						aria-label="LinkedIn"
						icon={<FaLinkedin fontSize="1.25rem" />}
					/>
					<IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
					<IconButton
						as="a"
						href="#"
						aria-label="Twitter"
						icon={<FaTwitter fontSize="1.25rem" />}
					/>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="subtle">
				&copy; {new Date().getFullYear()} Ofori James Ayerakwa.
			</Text>
		</Stack>
	</Box>
);
