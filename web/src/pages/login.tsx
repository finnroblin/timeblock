import { FormControl, FormLabel } from '@chakra-ui/form-control'
// import { values } from 'lodash'
import React from 'react';
import {Formik, Form } from  "formik";
import { Input } from '@chakra-ui/input';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';


interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    // display form 
    const router = useRouter(); // nextJS router
    const [, login] = useLoginMutation();
    return (
       <Wrapper> 
       <Formik initialValues={{ usernameOrEmail: "", password: "" }}
       onSubmit ={async (values, { setErrors }) => {
           const response = await login(values);
           console.log(response)

            if (response.data?.login.errors) {
                
                setErrors(
                    toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
                if (typeof router.query.next === 'string') {
                    router.push(router.query.next);
                } else {
                // registration successful
                router.push("/");
                }
            }
       }}
       >
        {( props) => (
            <Form> 
                <InputField
                    name="usernameOrEmail"
                    placeholder="username or email"
                    label="Username or Email"
                />
                <Box mt={4}>
                <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                />
                </Box>
                <Flex mt={2}> 
                
                    <NextLink href="/forgot-password">
                        <Link ml="auto">forgot password?</Link>
                    </NextLink>
                
                </Flex>


                <Button
                 mt={4}
                 type="submit" colorScheme="teal" isLoading={props.isSubmitting}
                > login </Button>
            </Form>
        )
               
           
        }
       </Formik>
       </Wrapper>
   );
};

export default Login; 

