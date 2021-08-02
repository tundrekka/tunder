import { Heading, Text } from "@chakra-ui/react"
import { Layout } from "components/Layout"
import { useGetPostFromUrl } from "hooks/useGetPostFromUrl"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "utils/createUrqlClient"

interface PostProps {
   
}

const Post: React.FC<PostProps> = ({}) => {
   const [{data, error ,fetching}] = useGetPostFromUrl()

   if( fetching ) {
      return <div>Loading...</div>
   }
   if( error ) {
      return <div>{error.message}</div>
   }
   if(!data?.post) {
      return (
         <Layout>
            <h3>Could not find a post</h3>
         </Layout>
      )
   }
   return (
      <Layout>
         <Heading mb={4}>{data.post.title}</Heading>
         <Text>{data.post.text}</Text>
      </Layout>
   )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Post)