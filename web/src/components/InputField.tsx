import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps =  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    
    name: string;
    textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _,
    ...props}) => {
        let InputOrTextarea = Input;
        if (textarea) {
            InputOrTextarea = Textarea;
        }
    const [field, {error}] = useField(props);

        return (
             // not an empty string 
        <FormControl isInvalid={!!error}>

                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputOrTextarea {...field}
                {...props}
                id={field.name} placeholder={props.placeholder} />
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
              </FormControl>
              );
}