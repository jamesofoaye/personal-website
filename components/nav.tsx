import Link from "next/link";
import Image from "next/image";
import { Box, Button, chakra, Stack } from "@chakra-ui/react";
import { Layout } from "./layout";
import { useNavbar } from "./useNavbar";
import { BsEnvelope } from 'react-icons/bs'


export const Navbar = () => {
	const { rootProps } = useNavbar();

	return (
		<Box as="nav" role="navigation" position="sticky" top="0" zIndex="docked" {...rootProps}>
			<Layout minH="10">
				<Stack justify="space-between" direction="row" align="center" maxW={'7xl'} mx={'auto'} w="100%">
					<Image src="/my-logo.png" alt="Logo" width={300} height={70} objectFit={"contain"} />

					<Box>
						<Link href={"#"}>
							<chakra.a>Home</chakra.a>
						</Link>
						<Link href={"#"}>
							<chakra.a mx={16}>Experience</chakra.a>
						</Link>
						<Link href={"#"}>
							<chakra.a>Projects</chakra.a>
						</Link>
					</Box>



					<Button border={"2px solid black"} bg="transparent" leftIcon={<BsEnvelope />} >
						Let&apos; talk
					</Button>
				</Stack>
			</Layout>
		</Box >
	);
};
