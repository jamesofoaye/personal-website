import Link from "next/link";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";

// export default function Nav() {
//   return (
//     <nav>
//       <ul className="lg:flex lg:justify-between lg:items-center p-2">
//         <li className="lg:hidden">
//           <Link href="/" >
//             <Image
//               src="/my-logo.jpg"
//               alt="My Logo"
//               width={250}
//               height={70}
//               layout="responsive"
//             />
//           </Link>
//         </li>
//         <li className="hidden lg:block lg:pl-2">
//           <Link href="/" >
//             <Image
//               src="/my-logo.jpg"
//               alt="My Logo"
//               width={250}
//               height={70}
//             />
//           </Link>
//         </li>
//         <ul className="flex justify-between items-center space-x-4 px-12 pb-8 lg:p-6">
//           <li>
//             <button className="bg-teal-700 hover:bg-teal-900 text-white font-normal lg:font-bold py-2 px-4 rounded-full">
//               <Link href="./Ofori James Ayerakwa Web Dev Resume.pdf">Resume / CV</Link>
//             </button>
//           </li>
//           <li>
//             <button className="bg-teal-700 hover:bg-teal-900 text-white font-normal lg:font-bold py-2 px-4 rounded-full">
//               <Link href="./portfolio">Portfolio</Link>
//             </button>
//           </li>
//         </ul>
//       </ul>
//     </nav>
//   )
// }

import { Box, Button, chakra } from "@chakra-ui/react";
import { Layout } from "./layout";
import { useNavbar } from "./useNavbar";

const EnvelopeIcon = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
		</svg>
	)
}

export const Navbar = () => {
	const { rootProps } = useNavbar();

	return (
		<Box as="nav" role="navigation" position="sticky" top="0" zIndex="docked" {...rootProps}>
			<Layout minH="10">
				<Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
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



					{/* <Icon as={EnvelopeIcon} w={6} h={6} /> */}
					<Button border={"2px solid black"} bg="transparent" >
						<span>
							Let&apos; talk
						</span>
					</Button>
				</Box>
			</Layout>
		</Box>
	);
};
