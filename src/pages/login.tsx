import NextLink from 'next/link'
import { Box, Button, Link } from '@chakra-ui/react'
import { InputField } from 'components/InputField'
import { Wrapper } from 'components/Wrapper'
import { Form, Formik } from 'formik'
import { useLoginMutation } from 'generated/graphql'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import { createUrqlClient } from 'utils/createUrqlClient'
import { toErrorMap } from 'utils/toErrorMap'
const Login: React.FC<{}> = ({}) => {
   const router = useRouter()
   const [, login] = useLoginMutation()

   return (
      <Wrapper variant="small">
         <h2 style={{ textAlign: 'center' }}>Login</h2>
         <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
               const response = await login(values)
               if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors))
               } else if (response.data?.login.user) {
                  router.push('/')
               }
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField
                     name="usernameOrEmail"
                     placeholder="username or email"
                     label="Username or Email"
                  />
                  <InputField
                     name="password"
                     label="password"
                     placeholder="password"
                     type="password"
                  />
                  <Box textAlign="right" mt={1}>
                     <NextLink href="/forget-password">
                        <Link color="teal.200">Forgot password?</Link>
                     </NextLink>
                  </Box>
                  <Box textAlign="center">

                     <Button
                        mt={4}
                        isLoading={isSubmitting}
                        type="submit"
                        colorScheme="teal"
                     >
                        Login
                     </Button>
                  </Box>
                 
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}
export default withUrqlClient(createUrqlClient)(Login)
