import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
  Image,
  Text,
  Button,
} from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/toast'

import theme from 'src/pages/LoginPage/theme'

import '@fontsource/fredoka-one/400.css'
import '@fontsource/dm-sans/700.css'

const MainLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <Flex spacing={0}>
        <VStack
          w={'15vw'}
          h={'100vh'}
          backgroundColor={'#252628'}
          color={'white'}
        >
          <VStack w={'80%'} spacing={'2vh'}>
            <Text mt={'5vh'} fontSize={36} fontFamily={'Fredoka One'}>
              Crush It
            </Text>
            <Image mt={'10vh'} src={'img/pending.png'} />
            {/*
            TODO:
            The following will need to be selectively hidden if the user has already planned their day
            */}
            <Text
              textAlign={'center'}
              fontSize={20}
              fontFamily={'DM Sans'}
              fontWeight={'700'}
            >
              It's time to plan your day!
            </Text>
            <Button
              colorScheme={'white'}
              variant={'outline'}
              w={'100%'}
              pt={7}
              pb={7}
            >
              Plan Day
            </Button>
          </VStack>
        </VStack>
        <VStack
          w={'85vw'}
          justifyContent={'top'}
          p={0}
          m={0}
          align={'flex-start'}
        >
          <Box w={'100%'} h="4vh" minHeight={'60px'} boxShadow={'md'}>
            {/* In here would go the profile picture and search bar components */}
          </Box>
          <Box backgroundColor={'#FEFEFE'} w={'100%'} h={'100%'}>
            <Box p={'24px'}>{children}</Box>
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  )
}

export default MainLayout
