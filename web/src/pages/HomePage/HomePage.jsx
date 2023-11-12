import {Link, routes} from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import {Box, Flex, Text} from "@chakra-ui/react";
import TaskBox from "src/components/TaskBox/TaskBox";

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.jsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>

      {isAuthenticated ? <p>{currentUser ? currentUser.email : ''}</p> : <p>nothing to see here</p>}

      <Flex fontFamily={'DM Sans'} gap={'5%'}>
          <Box w={"50%"}>
              <Text fontSize={'30px'} fontWeight={'700'}>Tasks</Text>
              <Box w={'100%'} p={'20px'} borderRadius={'10px'} boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}>
                  <TaskBox />
              </Box>
          </Box>
          <Box>
              <Text fontSize={'30px'} fontWeight={'700'}>Appointments</Text>
          </Box>
      </Flex>
    </>
  )
}

export default HomePage
