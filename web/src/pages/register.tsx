import { FormControl, FormLabel } from '@chakra-ui/form-control'
// import { values } from 'lodash'
import React from 'react';
import {Formik, Form } from  "formik";
import { Input } from '@chakra-ui/input';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    // display form 
    const router = useRouter(); // nextJS router
    const [, register] = useRegisterMutation();
    return (
       <Wrapper> 
       <Formik initialValues={{ email: "", username: "", password: "" }}
       onSubmit ={async (values, { setErrors }) => {
           const response = await register({ options: values});
           console.log(response)

            if (response.data?.register.errors) {
                
                setErrors(
                    toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
                // registration successful
                router.push("/");
            }
       }}
       >
        {( props) => (
            <Form> 
                <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                />
<Box mt={4}>
                <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                />
                </Box>

                <Box mt={4}>
                <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                />
                </Box>

                {/* <Button mt={4} type="submit" isLoading={isSubmitting} 
                variantColor="teal">
                    register
                </Button> */}
                <Button
                 mt={4}
                 type="submit" colorScheme="teal" isLoading={props.isSubmitting}
                > register</Button>
            </Form>
        )
               
           
        }
       </Formik>
       </Wrapper>
   );
};

// export default withUrqlClient(createUrqlClient)(Register);
export default Register; 
