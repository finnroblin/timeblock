import { Button } from '@chakra-ui/button';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { router } from 'websocket';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';
import NextLink from "next/link"
import { useChangePasswordMutation } from '../../generated/graphql';

export const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper> 
        <Formik initialValues={{ newPassword: "" }}
        onSubmit ={async (values, { setErrors }) => {
            const response = await changePassword(
                {
                    newPassword: values.newPassword,
                    token:
                        typeof router.query.token === "string" ? router.query.token : "",
                }
            );
            // console.log(response)
 
             if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(response.data.changePassword.errors);
                if ('token' in errorMap) {
                    setTokenError(errorMap.token);
                }
                setErrors(errorMap);
             } else if (response.data?.changePassword.user) {
                 // registration successful
                 router.push("/");
             }
        }}
        >
         {( props) => (
             <Form> 
                 <InputField
                     name="newPassword"
                     placeholder="new password"
                     label="New Password"
                     type="password"
                 />
                 {tokenError ? (
                     <Flex> 
                 <Box mr={2} color='red'> { tokenError }</Box>
                 <NextLink href="/forgot-password">
                 <Link> click here for new password </Link>
                </NextLink>
                 </Flex>
         )
                 : null }
                 

                 <Button
                  mt={4}
                  type="submit" colorScheme="teal" isLoading={props.isSubmitting}
                 > change password </Button>
             </Form>
         )
                
            
         }
        </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);