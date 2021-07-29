import { Box, Button, Link } from '@chakra-ui/react'
import { InputField } from 'components/InputField'
import { Wrapper } from 'components/Wrapper'
import { Formik, Form } from 'formik'
import { useChangePasswordMutation } from 'generated/graphql'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { createUrqlClient } from 'utils/createUrqlClient'
import { toErrorMap } from 'utils/toErrorMap'
import NextLink from 'next/link'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
   const [, changePassword] = useChangePasswordMutation()
   const router = useRouter()
   const [tokenError, setTokenError] = useState('')
   return (
      <>
         <Wrapper variant="small">
            <h2 style={{ textAlign: 'center' }}>Change password</h2>
            <Formik
               initialValues={{ newPassword: '' }}
               onSubmit={async (values, { setErrors }) => {
                  const response = await changePassword({
                     newPassword: values.newPassword,
                     token,
                  })
                  if(response.data?.changePassword.errors) {
                     const errorMap = toErrorMap(response.data.changePassword.errors)
                     if('token' in errorMap) {
                        setTokenError(errorMap.token)
                     }
                     setErrors(errorMap)

                  } else if( response.data?.changePassword.user ) {
                     // all good
                     router.push('/')
                  }
               }}
            >
               {({ isSubmitting }) => (
                  <Form>
                     <InputField
                        name="newPassword"
                        label="New Password"
                        placeholder="new password"
                        type="password"
                     />
                     { tokenError && (
                        <Box>
                           <Box as="span" color="red" mr={2}>{tokenError}</Box>
                           <NextLink href="/forget-password">
                              <Link color="teal">Get a new one</Link>
                           </NextLink>
                        </Box>
                     ) }
                     <Button
                        mt={4}
                        isLoading={isSubmitting}
                        type="submit"
                        colorScheme="teal"
                     >
                        Change password
                     </Button>
                  </Form>
               )}
            </Formik>
         </Wrapper>
      </>
   )
}

// ChangePassword.getInitialProps = ({query}) => {
//    return {
//       token: query.token as string
//    }
// }
export async function getServerSideProps(context: any) {
   return {
      props: {
         token: context.query.token,
      }, // will be passed to the page component as props
   }
}
export default withUrqlClient(createUrqlClient)(ChangePassword as any)
