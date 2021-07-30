import { ChakraProvider, GlobalStyle } from '@chakra-ui/react'
// import { NavBar } from 'components/NavBar'
// import { withUrqlClient } from 'next-urql'
// import { createUrqlClient } from 'utils/createUrqlClient'
import theme from '../theme'

function MyApp({ Component, pageProps }: any) {
   return (
      <>
         <GlobalStyle />
         <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
         </ChakraProvider>
      </>
   )
}

export default MyApp
