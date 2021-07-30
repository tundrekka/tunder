import { Box, Button } from "@chakra-ui/react"
import { InputField } from "components/InputField"
import { Wrapper } from "components/Wrapper"
import { Formik, Form } from "formik"
import { useCreatePostMutation } from "generated/graphql"
import { useIsAuth } from "hooks/useIsAuth"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/dist/client/router"
import { createUrqlClient } from "utils/createUrqlClient"

const CreatePost: React.FC<{}> = () => {

   const router = useRouter()

   useIsAuth()
   
   const [, createPost ] = useCreatePostMutation()
   
   return (
      <Wrapper>
         <h1>Create post</h1>
         <Formik
            initialValues={{ title: '', text: '' }}
            onSubmit={async (values) => {
               const { error } = await createPost({input: values})
               if(!error) {
                  console.log('no errors good')
                  router.push('/')
               }
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
                        Create Post
                     </Button>
                  </Box>
                 
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}

export default withUrqlClient(createUrqlClient)(CreatePost)