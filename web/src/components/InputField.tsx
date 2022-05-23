import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = textarea ? Input : Textarea;

  if (textarea) {
    const [field, { error }] = useField(props);

    // let handleChange = (e) => {
    //   console.log(e);
    // };

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Textarea
          // {...props}
          {...field}
          //   {...props}
          //   onChange={handleChange}
          //   value={field.value}
          id={field.name}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  } else {
    const [field, { error }] = useField(props);

    let handleChange = (e) => {
      console.log(e);
    };

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input
          {...field}
          {...props}
          // onChange={handleChange}
          id={field.name}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  //   if (textarea) {
  //     InputOrTextarea = Textarea;
  //   }
};
