import { Box, Link, Button } from '@chakra-ui/react'
import { InputField } from 'components/InputField'
import { Wrapper } from 'components/Wrapper'
import { Formik, Form } from 'formik'
import { useForgotPasswordMutation } from 'generated/graphql'
import { withUrqlClient } from 'next-urql'
import router from 'next/dist/client/router'
import { useState } from 'react'
import { createUrqlClient } from 'utils/createUrqlClient'
import { toErrorMap } from 'utils/toErrorMap'

const ForgetPassword: React.FC = () => {
   const [complete, setComplete] = useState(false)
   const [, forgotPassword] = useForgotPasswordMutation()
   return (
      <Wrapper variant="small">
         <h2 style={{ textAlign: 'center' }}>Forgot password</h2>
         <Formik
            initialValues={{ email: '' }}
            onSubmit={async ( values ) => {
               await forgotPassword( values )
               setComplete(true)
            }}
         >
            {({ isSubmitting }) => complete ? (
               <h3>We sent you an email (if that email exists)</h3>
            )
            : (
               <Form>
                  <InputField
                     name="email"
                     label="email"
                     placeholder="email"
                     type="email"
                  />
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
export default withUrqlClient(createUrqlClient)(ForgetPassword)
