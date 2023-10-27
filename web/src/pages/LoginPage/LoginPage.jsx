import '@fontsource/fredoka-one/400.css'
import '@fontsource/dm-sans/400.css'
import {stackLeft, stackRight, loginBox, loginText,gButtBox,gButtContent, signInButton } from './config'
import {
  ChakraProvider,
  Stack,
  Image,
  Flex,
  Text,
  Heading,
  Link,
  Input,
  Button,
  Center,
  Box,
} from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
/* (dont seem to use these imports)
import { Link, routes } from '@redwoodjs/router'
If we need to get rid of Link import from chakra to user Link from redwood use below code instead:
<a style={{color:"blue"}}href="https://example.com"> Sign up here</a>


idk what to do with this but ill leave it here, add attribute theme={theme} to chakraprovider to use it
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

        <Center h="100vh" bg="darkgray">
          <Image src="img/pending.png" />
          <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md"></Stack>
        </Center>


*/
import theme from './theme.js'
import {Redirect, routes} from "@redwoodjs/router";

const Backdrop = () =>{
  return(
    <Flex color="white" h="100vh">
      <Stack {...stackLeft}>
        <Heading pt="25vh">Crush It</Heading>
        <Image src="img/pending.png" />
      </Stack>
      <Stack {...stackRight} />
      <LoginForm/>
    </Flex>
  )
}

const GoogleLogin = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (isAuthenticated) return (
    /* Redirect to home page if user is authenticated already */
    <Redirect to={routes.home()} />
  )

  return (
    <Flex {...gButtBox}>
      <MetaTags title="Login" description="Login page" />
      <Box {...gButtContent}>
        <Image
          src="img/googleGIcon.png"
          alt="Google Icon"
          boxSize="80px"
          mx="auto"
        />
        <Text textAlign="center" my="4">
          Welcome! Please sign in with Google.
        </Text>
        <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.GOOGLE_OAUTH_SCOPES}&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`}>
          <Button {...signInButton}>
            Sign in with Google
          </Button>
        </a>
      </Box>
    </Flex>
  )}


const LoginForm = () => {
  return(
    <Stack {...loginBox}>
      <Text {...loginText}>Log in</Text>
      <GoogleLogin />
    </Stack>
  )
}



const LoginPage = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <MetaTags title="Login" description="Login page" />
        <Backdrop>
          <LoginForm/>
        </Backdrop>
      </ChakraProvider>
    </>
  )
}

export default LoginPage
