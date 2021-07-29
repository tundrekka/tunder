import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { FieldHookConfig, useField } from "formik"
import React from "react"

type InputFieldProps = FieldHookConfig<any> & {
   label: string;

}

export const InputField: React.FC<InputFieldProps> = ({label , type, placeholder ,...props}) => {
   const [field, {error}] = useField(props)
   return (
      <FormControl isInvalid={!!error}>
         <FormLabel htmlFor={field.name}>{label}</FormLabel>
         <Input {...field } placeholder={placeholder} type={type} id={field.name}/>
         {
            error
            ? <FormErrorMessage>{error}</FormErrorMessage>
            : null
         }
         
      </FormControl>
   )
}