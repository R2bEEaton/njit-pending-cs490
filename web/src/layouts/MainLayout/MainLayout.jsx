import {Box, Button, ChakraProvider, Flex, Image, Spacer, Text, VStack,} from "@chakra-ui/react";
import {useAuth} from 'src/auth';
import UserInfo from 'src/components/UserInfo';
import theme from "src/pages/LoginPage/theme";
import {useState} from "react"
import HomePage from "src/pages/HomePage/HomePage";
import '@fontsource/fredoka-one/400.css'
import '@fontsource/dm-sans/700.css'
import NotFoundPage from "src/pages/NotFoundPage/NotFoundPage";
import SettingsPage from "src/pages/SettingsPage/SettingsPage";
import moment from "moment"

const MainLayout = ({ children }) => {
  const { currentUser, logOut } = useAuth();
  const [date2, setDate2] = useState();

  // Get the route name from the location object
  const routeName = location.pathname.substring(1); // Remove the leading '/'

  // Conditionally set the title based on the route name
  let title = 'Home';
  if (routeName === 'settings') {
    title = 'Profile';
  }

  
  return (

    <ChakraProvider theme={theme}>
      <Flex spacing={0}>
        <VStack w={"15vw"} h={"100vh"} backgroundColor={"#252628"} color={"white"}>
          <Flex flexDirection={'column'} alignItems={'center'} w={"80%"} gap={"2vh"} flexGrow={'1'}>
            <Text mt={"5vh"} fontSize={36} fontFamily={"Fredoka One"}>Crush It</Text>
            <Image mt={"10vh"} src={"img/pending.png"} />
            <Box hidden={title === 'Profile'|| (date2 && moment(date2, 'YYYY-MM-DD').isBefore(moment(), 'day'))}>
              <Text textAlign={"center"} fontSize={20} fontFamily={"DM Sans"} fontWeight={"700"}>It's time to plan your day!</Text>
              <Button colorScheme={"white"} variant={"outline"} w={"100%"} pt={7} pb={7} href={`/.netlify/functions/rolloverPreviousTasks?userId=${currentUser?.id}&date=2023-12-19`} as={'a'}>Plan Day</Button>
            </Box>
            <Spacer />
            <Button colorScheme={"white"} variant={"outline"} type='button' onClick={logOut} mb={'5vh'}><LogoutIcon />Logout</Button>
          </Flex>
        </VStack>
        <VStack w={"85vw"} justifyContent={"top"} p={0} m={0} spacing={0}>
          <Box w={"100%"} h="4vh" minHeight={"60px"} boxShadow={"2px 5px 50px 0px rgba(32, 44, 85, 0.08)"}>
            <Flex alignItems={'center'} h={'100%'} ml={'15px'} mr={'15px'}>
              <Text fontFamily={'DM Sans'} fontSize={'30px'}>
                {title}
              </Text>
              <UserInfo currentUser={currentUser} />
            </Flex>
          </Box>
          <Box w={"100%"} h="96vh" maxHeight={"calc(100vh - 60px)"} overflowY={"auto"} p={"24px"}>
            {renderPage(title, { date2, setDate2 })}
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  )
}
const renderPage = (title, commonProps) => {
  switch (title) {
    case 'Home':
      return <HomePage {...commonProps} />;
    case 'Profile':
      return <SettingsPage/>;
    // Add more cases for other pages
    default:
      return <NotFoundPage />;
  }
}

const LogoutIcon = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.4399 14.62L19.9999 12.06L17.4399 9.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.76001 12.06H19.93" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  )
}

export default MainLayout
