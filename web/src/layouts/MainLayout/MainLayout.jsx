import {Box, ChakraProvider, Flex, Heading, HStack, Stack, VStack, Image, Text, Button} from "@chakra-ui/react";
import theme from "src/pages/LoginPage/theme";
import {MetaTags} from "@redwoodjs/web";

const MainLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex spacing={0}>
        <VStack w={"15vw"} h={"100vh"} backgroundColor={"#252628"} color={"white"} p={0} m={0}>
          <Heading>Crush It</Heading>
          <Image src={"img/pending.png"} />
          <Text>It's time to plan your day!</Text>
          <Button colorScheme={"white"} variant={"outline"}>Plan Day</Button>
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
