import {
   Box,
   Button,
   Flex,
   Heading,
   Link,
   Stack,
   Text,
} from '@chakra-ui/react'
import { Layout } from 'components/Layout'
import { UpdootSection } from 'components/UpdootSection'
import {
   useMeQuery,
   usePostsQuery,
} from 'generated/graphql'
import { withUrqlClient } from 'next-urql'
import { useState } from 'react'
import { createUrqlClient } from 'utils/createUrqlClient'
import NextLink from 'next/link'
import { EditDeletePostButtons } from 'components/EditDeletePostButtons'
const Index = () => {
   const [variables, setVariables] = useState({
      limit: 12,
      cursor: null as null | string,
   })
   const [{ data, fetching }] = usePostsQuery({
      variables,
   })


   if (!fetching && !data) {
      return <p>Internal Error, try reloading</p>
   }

   return (
      <Layout>
         <h2>hola index</h2>
         <br />
         {!data && fetching ? (
            <p>Loading...</p>
         ) : (
            <Stack spacing={8}>
               {data!.posts.posts.map((p) =>
                  !p ? null : (
                     <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                        <UpdootSection post={p} />
                        <Box flex={1}>
                           <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                              <Link>
                                 <Heading fontSize="xl">{p.title}</Heading>
                              </Link>
                           </NextLink>
                           <Text>posted by: {p.creator.username}</Text>
                           <Text mt={4}>{p.textSnippet}</Text>
                        </Box>
                        <Box>
                           <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                        </Box>
                     </Flex>
                  )
               )}
            </Stack>
         )}
         {data && data.posts.hasMore && (
            <Box textAlign="center">
               <Button
                  onClick={() => {
                     setVariables({
                        ...variables,
                        cursor:
                           data.posts.posts[data.posts.posts.length - 1]
                              .createdAt,
                     })
                  }}
                  isLoading={fetching}
                  my={8}
               >
                  Load More
               </Button>
            </Box>
         )}
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
