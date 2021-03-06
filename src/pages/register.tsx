import { Button } from "@chakra-ui/react";
import { InputField } from "components/InputField";
import { Wrapper } from "components/Wrapper";
import { Form, Formik } from "formik";
import { useRegisterMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import { createUrqlClient } from "utils/createUrqlClient";
import { toErrorMap } from "utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {

   const router = useRouter()
   const [, register] = useRegisterMutation()

   return (
      <Wrapper variant="small">
         <h2 style={{textAlign: 'center'}}>Register</h2>
         <Formik
            initialValues={{email: "" ,username: "", password: "" }}
            onSubmit={ async(values, {setErrors}) => {
               const response = await register({options: values})
               if(response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors))
               } else if( response.data?.register.user ) {
                  console.log('user')
                  router.push('/')
               }
            }}
         >
            {({ isSubmitting}) => (
               <Form>
                  <InputField 
                     name="username"
                     label="Username"
                     placeholder="username"
                  />
                  <InputField 
                     name="email"
                     label="Email"
                     placeholder="email"
                     type="email"
                  />
                  <InputField 
                     name="password"
                     label="Password"
                     placeholder="password"
                     type="password"
                  />
                  <Button mt={4} isLoading={isSubmitting} type="submit" colorScheme="teal">
                     Register
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   );
};
export default withUrqlClient(createUrqlClient)(Register);


