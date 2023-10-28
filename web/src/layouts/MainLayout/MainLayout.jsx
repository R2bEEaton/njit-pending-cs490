import {Box, ChakraProvider, Flex, Heading, HStack, Stack, VStack, Image, Text, Button} from "@chakra-ui/react";
import theme from "src/pages/LoginPage/theme";
import {MetaTags} from "@redwoodjs/web";

const MainLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex spacing={0}>
        <VStack w={"15vw"} h={"100vh"} backgroundColor={"#252628"} color={"white"}>
          <VStack w={"80%"} spacing={"2vh"}>
            <Heading mt={"5vh"}>Crush It</Heading>
            <Image mt={"10vh"} src={"img/pending.png"} />
            { /*
            TODO:
            The following will need to be selectively hidden if the user has already planned their day
            */ }
            <Text textAlign={"center"} fontSize={"20px"} fontWeight={"700"}>It's time to plan your day!</Text>
            <Button colorScheme={"white"} variant={"outline"} w={"100%"}>Plan Day</Button>
          </VStack>
        </VStack>
        <VStack w={"85vw"} justifyContent={"top"} p={0} m={0} align={"flex-start"}>
          <Box w={"100%"} h="5vh" minHeight={"70px"} boxShadow={"md"}>
            {
              /* In here would go the profile picture and search bar components */
            }
          </Box>
          <Box backgroundColor={"#FEFEFE"}>
            <>{children}</>
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  )
}

export default MainLayout
