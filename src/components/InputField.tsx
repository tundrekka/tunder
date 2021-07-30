import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from "@chakra-ui/react"
import { FieldHookConfig, useField } from "formik"
import React from "react"

type InputFieldProps = FieldHookConfig<any> & {
   label: string
   textarea?: boolean

}

export const InputField: React.FC<InputFieldProps> = ({label , type, textarea ,placeholder ,...props}) => {
   const [field, {error}] = useField(props)
   let InputOrTextarea: any = Input
   if(textarea) {
      InputOrTextarea = Textarea
   }
   return (
      <FormControl isInvalid={!!error}>
         <FormLabel htmlFor={field.name}>{label}</FormLabel>
         <InputOrTextarea {...field } placeholder={placeholder} type={type} id={field.name}/>
         {
            error
            ? <FormErrorMessage>{error}</FormErrorMessage>
            : null
         }
         
      </FormControl>
   )
}