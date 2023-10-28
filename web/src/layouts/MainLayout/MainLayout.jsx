import {ChakraProvider, Stack} from "@chakra-ui/react";
import theme from "src/pages/LoginPage/theme";
import {MetaTags} from "@redwoodjs/web";

const MainLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <h1>test</h1>
      <>{children}</>
    </ChakraProvider>
  )
}

export default MainLayout
