import NextLink from 'next/link'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { useLogoutMutation, useMeQuery } from 'generated/graphql'
import { isServer } from 'utils/isServer'
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
   const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
   const [{ data, fetching }] = useMeQuery({
      pause: isServer(),
   })

   let body = null

   if (fetching) {
   } else if (!data?.me) {
      body = (
         <>
            <NextLink href="/">
               <Link mr={2}>Home</Link>
            </NextLink>
            <NextLink href="/login">
               <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
               <Link>Register</Link>
            </NextLink>
         </>
      )
   } else {
      body = (
         <Flex>
            <Box mr={2} as="p">
               {data.me.username}
            </Box>
            <NextLink href="/create-post">
               <Link>Create P</Link>
            </NextLink>
            <Button
               ml="auto"
               onClick={() => {
                  logout()
               }}
               isLoading={logoutFetching}
               variant="link"
            >
               Logout
            </Button>
         </Flex>
      )
   }

   return (
      <Box bg="tomato" p={4}>
         <div>{body}</div>
      </Box>
   )
}
