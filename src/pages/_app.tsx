import { ChakraProvider, GlobalStyle } from '@chakra-ui/react'
import theme from '../theme'
// import { NavBar } from 'components/NavBar'

function MyApp({ Component, pageProps }: any) {
   return (
      <>
         <GlobalStyle />
         <ChakraProvider resetCSS theme={theme}>
            {/* <NavBar /> */}
            <Component {...pageProps} />
         </ChakraProvider>
      </>
   )
}

export default MyApp
