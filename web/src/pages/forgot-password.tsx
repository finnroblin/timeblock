import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import _ from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react'
import { router } from 'websocket';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';

export const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small"> 
       <Formik 
       initialValues={{ email: "" }}
       onSubmit ={async (values) => {
           await forgotPassword(values);
           setComplete(true);
       }}
       >
        {( props) => 
        complete ? 
        (<Box> if an account with that email exists, we sent you an email</Box>) :
        (
            <Form> 
                
                
                <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                />
                

                <Button
                 mt={4}
                 type="submit" colorScheme="teal" isLoading={props.isSubmitting}
                > forgot password </Button>
            </Form>
        )
               
           
        }
       </Formik>
       </Wrapper>
        );
};

export default ForgotPassword;
