import {
    Box,
    Button,
    Flex,
    Heading,
    Img,
    SimpleGrid,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'

export function Hero() {
    return (
        <Box as="section" bg={mode('gray.50', 'gray.800')} pt="24" pb="12" overflow="hidden">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Flex
                    align="flex-start"
                    direction={{ base: 'column', lg: 'row' }}
                    justify="space-between"
                    mb="20"
                >
                    <Box flex="1" maxW={{ lg: 'xl' }} pt="6">
                        <Text>Hello, I&apos;m</Text>
                        <Heading as="h1" size="4xl" mt="8" fontWeight="extrabold" fontFamily={'Commissioner'}>
                            James
                        </Heading>
                        <Text color={mode('gray.600', 'gray.400')} mt="5" fontSize="xl">
                            {`
                            <p> A Frontend developer with a strong eye for innovative design and a keen 
                            understanding of techniques geared toward optimum user experience. I'm passionate 
                            about continuously learning in the tech industry and supporting people to solve 
                            their technical problems. </p>
                            `}
                        </Text>
                        <Box>
                            <Button
                                mt="8"
                                minW="14rem"
                                border={mode('1px solid #000', '1px solid #fff')}
                                bg='transparent'
                                size="lg"
                                height="12"
                                px="8"
                                fontSize="md"
                                fontWeight="bold"
                            >
                                My experience
                            </Button>
                            <Button
                                mt="8"
                                minW="14rem"
                                border={mode('1px solid #000', '1px solid #fff')}
                                bg='transparent'
                                size="lg"
                                height="12"
                                px="8"
                                fontSize="md"
                                fontWeight="bold"
                                ml={4}
                            >
                                Projects
                            </Button>
                        </Box>
                    </Box>
                    <Box boxSize={{ base: '20', lg: '8' }} />
                    <Img
                        pos="relative"
                        marginEnd="-16rem"
                        w="50rem"
                        src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621082943/pro-website/screenshot-dark_w6jpks.png"
                        alt="Screenshot for Form builder"
                    />
                </Flex>

            </Box>
        </Box>
    )
}