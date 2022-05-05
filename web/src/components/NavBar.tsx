// import { Box, Flex, Heading } from '@chakra-ui/layout';
// import {Button, Link} from "@chakra-ui/react";
// import React from 'react'
// import NextLink from 'next/link'
// import { useLogoutMutation, useMeQuery } from '../generated/graphql';
// import { isServer } from '../utils/isServer';
// import {useRouter} from 'next/router'

// // import { useApolloClient } from "@apollo/client"
// interface NavBarProps {}

// export const NavBar: React.FC<NavBarProps> = ({}) => {
//     const router = useRouter();
//     const [{fetching: logoutFetching}, logout] = useLogoutMutation();
//     // const apolloClient = useApolloClient();
//     const [{data, fetching}] = useMeQuery({
//         pause: isServer(),
//     });

//     let body = null;

//     // data is loading
//     if (isServer() || fetching) {

//     }
//     // user not logged in
//     else if (!data?.me) {
//         // console.log("IT's NOT LOGGED IN!!")

//         body = (
//             <>
            
//                     <NextLink href="/login">
//                 <Link  mr={2}>login </Link>
//                 </NextLink>
//                 <NextLink href="/register">

//                 <Link >register</Link>
//                 </NextLink>

               
//             </>
//         )
//     }
//     // user is logged in  
//     else {
//         console.log(data)
//         console.log("USER LOGGED IN!!")
//         body = (
//             <Flex align="center">
//         <NextLink href="/create-post">
//             <Button as={Link} mr={4}> 
//             <Link mr={2}>create post</Link>
//             </Button>
//         </NextLink>
//         <Box> { data.me.username } </Box> 
//         <Button onClick={async () => {
//             await logout();
//             router.reload();
//             // await apollo
//         }}
//             isLoading = {logoutFetching}
//             variant = "link" > logout</Button>
//         </Flex>
//         )
//     }
//         return (
//             <Flex
//             zIndex={1} position="sticky" top={0} bg="tan" p={4} >
//                 <Flex align="center" margin="auto" maxW={800}>
//                 <NextLink href="/">
//                     <Link>
//                     <Heading>RedditClone</Heading>   
//                     </Link>
//                 </NextLink>
//                 </Flex>
//                 <Box ml={"auto"}>{body}</Box>  
//             </Flex>
//         );
// }
// import {
//   Text,
//   Box,
//   Button,
//   Center,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
//   Link,
//   Heading,
// } from "@chakra-ui/react";
import {
      Text,
      Box,
      Button,
      Center,
      Flex,
      Modal,
      ModalBody,
      ModalCloseButton,
      ModalContent,
      ModalFooter,
      ModalHeader,
      ModalOverlay,
      useDisclosure,
      Link,
      Heading,
    } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useGetRefreshTokenQuery, useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // return (
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  


const [refresh_token] = useGetRefreshTokenQuery({
  pause: (isServer() || fetching)
});

  let body = null;
  // // data is loading
  if (isServer() || fetching) {
    return (
      <>
      <Text>
        Loading
      </Text>
      </>
    )
  }
  // // user not logged in
// const refresh_token = " trues";
// const [refresh_token] = useGetRefreshTokenQuery();


  if (!data?.me) {

    return (
      <>
        <NextLink href="/login">
          <Link mr={2}>login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }
  // // user is logged in
  else {
    return (
      <Flex zIndex={1} position="sticky" top={0} bg="blue.100" p={4}>
        <Flex>
          <Heading color="green.500" margin="auto" maxW={800}>
             Zenblock
          </Heading>
        </Flex>
        <Box ml={"auto"}>
          <Button color="black.500" onClick={onOpen}>
            About
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent backgroundColor={"white"}>
              <ModalHeader>About Simple Timeblock</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                A timeblocking webapp developed to be effective and
                distraction-free. Place the day's tasks in the left inbox,
                specify their timeframes, and they will be sent to that day's
                schedule. Timeblocking is highly effective at maximizing working
                time. I was introduced to this concept by Cal Newport, who
                introduces it here:
                <a href="https://www.calnewport.com/blog/2013/12/21/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/">
                  link{" "}
                </a>
                Coming soon: Support for multiple-day blocking and time tracking
                (possibly through a browser extension?) Ideas/questions/bugs?
                I'd love to hear them, shoot me an email at: finn dot s dot
                roblin at gmail dot com
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* <Box ml={'auto'}> */}
          <Text>
            Welcome, {data.me.username}
          </Text>
          <div>  
            { refresh_token.data ? 
          (<Text>
            Synced with Google {refresh_token.data}

          </Text>) : (<Button>
            <NextLink href="/gsetup">
              <Link>
                Sync with Google Calendar 
              </Link>
            </NextLink>
          </Button>)
  }
          </div>

          <Button color="black.500" onClick={() => {
            logout();
          }}>
            <NextLink href="/login">

              <Link> logout</Link>
            </NextLink>
          </Button>
          {/* </Box> */}
        </Box>
      </Flex>
    );
  }
};
{
  /* <Box justify-content= {"center"}
  align-items= {"center"}
  text-align= {"center"}
  minHeight= {100}
  pt={10}
>
          <Center>
            <Heading color="green.500"> 
            Login to Zenblock
            </Heading>
          </Center>
          <Center pt={3}> */
}
