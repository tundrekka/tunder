import {
   FormControl,
   FormLabel,
   Input,
   FormErrorMessage,

} from "@chakra-ui/react";
import { Wrapper } from "components/Wrapper";
import { Form, Formik } from "formik";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
   return (
      <Wrapper>
         <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
               console.log(values);
            }}
         >
            {({ values, handleChange }) => (
               <Form>
                  <FormControl>
                     <FormLabel htmlFor="username">Username</FormLabel>
                     <Input
                        value={values.username}
                        onChange={handleChange}
                        id="username" 
                        placeholder="username"
                     />
                     <h2>REgay</h2>
                     {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                  </FormControl>
               </Form>
            )}
         </Formik>
         <h2>Mamawebo</h2>
      </Wrapper>
   );
};
export default Register;
