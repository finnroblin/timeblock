import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { values } from 'lodash'
import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@chakra-ui/input";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading, Link } from "@chakra-ui/layout";
import { useMutation } from "urql";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { isServer } from "../utils/isServer";

interface gSetupProps {}

const GSetup: React.FC<gSetupProps> = ({}) => {
  // display form
  const router = useRouter(); // nextJS router
  const [, login] = useLoginMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const responseError = (err) => {
    console.log(
      "---------------------------------- Error ----------------------------------"
    );
    console.log(err);
  };
  const responseGoogle = (resp) => {
    // only going to work if user has already signed in and recieved refresh token
    console.log("RESPONSE!");
    console.log(resp);
    const { code } = resp;
    const userId = data.me.id;
    console.log(code);

    axios
      .post("http://localhost:4000/api/create-tokens", { code, userId })
      .then((resp) => {
        // maybe call the get handler function here, put every google event into a Block.

        // might need to post here instead of calling a function, and then push result to createBlocks
        // setSignedIn(true);
        console.log("Successfully signed in");
        // store user refresh token in database
        // req.session.google_is_linked = true; // save that user has linked their google account in cookie

        // getNormalizedGCalDateEvent(d);
        console.log("DATA:");
        console.log(resp.data);
        // setSignedIn(true);
      })
      .catch((err) => {
        console.log("ERRROR!!");
        console.log(err.message);
      });
  };
  if (fetching) {
    return (
      <Wrapper>
        <Text>Google setup page (loading user data)</Text>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Text>Google setup page</Text>
        <Box
          justify-content={"center"}
          align-items={"center"}
          text-align={"center"}
          minHeight={100}
          pt={10}
        >
          <Center>
            <Heading color="green.500">Login to Zenblock</Heading>
          </Center>
          <Center pt={3}>
            <GoogleLogin
              clientId="597602837391-n16324cfeevmthbldne784pke8n05q2e.apps.googleusercontent.com"
              buttonText="Sign in & authorize zenblock"
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={"single_host_origin"}
              responseType="code"
              accessType="offline" // allows us to use code on backend, so can access calendar when user is offline
              scope="openid email profile https://www.googleapis.com/auth/calendar"
              // code; 4/0AX4XfWhsfBJf_9Gc013JrYMqDLscRdaciHx8Rj-vzThBbuAWCJFssb5raDAGX7ccPfHC9A
            />
          </Center>
        </Box>
      </Wrapper>
    );
  }
};

export default withUrqlClient(createUrqlClient)(GSetup);
