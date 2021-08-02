import { Box, Button } from "@chakra-ui/react"
import { InputField } from "components/InputField"
import { Layout } from "components/Layout"
import { Formik, Form } from "formik"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "utils/createUrqlClient"
import { useIsAuth } from "hooks/useIsAuth"
import { usePostQuery, useUpdatePostMutation } from "generated/graphql"
import { useGetIntId } from "hooks/useGetIntId"
import Router from "next/router"

interface EditPostProps {
   
}

const EditPost: React.FC<EditPostProps> = ({}) => {

   
   useIsAuth()
   const intId = useGetIntId()
   const [{data, fetching}] = usePostQuery({
      pause: intId === -1,
      variables: {
         id: intId
      }
   })
   const [, updatePost] = useUpdatePostMutation()
   if(fetching) {
      return (
         <Layout>
            <h3>Loading...</h3>
         </Layout>
      )
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
         <h2>Edit Post</h2>
         <Formik
            initialValues={{ title: data.post.title, text: data.post.text }}
            onSubmit={async (values) => {
               await updatePost({id: intId, ...values})
               Router.back()
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField
                     name="title"
                     placeholder="title"
                     label="Title"
                  />
                  <InputField
                     textarea
                     name="text"
                     label="Body"
                     placeholder="text..."
                  />
                  <Box textAlign="center">
                     <Button
                        mt={4}
                        isLoading={isSubmitting}
                        type="submit"
                        colorScheme="teal"
                     >
                        Update Post
                     </Button>
                  </Box>
                 
               </Form>
            )}
         </Formik>
      </Layout>
   )
}
export default withUrqlClient(createUrqlClient)(EditPost)