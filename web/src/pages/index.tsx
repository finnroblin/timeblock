// import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from 'next-urql';
// import NextLink from "next/link";
// import { useState } from "react";
// import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
// import { Layout } from "../components/Layout";
// import { UpdootSection } from "../components/UpdootSection";
// import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Stack,
    Text
  } from "@chakra-ui/react";
//   import GoogleLogin from "react-google-login";
  import { useMutation, useQuery } from "urql";
  import { Block } from "../components/Block";
  import { Inbox } from "../components/Inbox";
  import { Layout } from "../components/Layout";
  import { NavBar } from "../components/NavBar";
  import { Schedule } from "../components/Schedule";
  import { useBlocksQuery, useCreateBlockMutation, useSetBlockMutation, useCreateBlockWithTimesMutation, useMeQuery, useGetRefreshTokenQuery } from "../generated/graphql";
  import axios from "axios";
  import { useState } from "react";
  import { NewInbox } from "../components/NewInbox";
  import {getCurrentDate} from '../utils/getCurrentDate'
import { MainPage } from '../components/MainPage';
  
  const Index = () => {
    const [setBlock, setBlockMutation] = useSetBlockMutation();
    const [createBlock, createBlockMutation] = useCreateBlockMutation();
    const [creatBlockWithTimes, createBlockWithTimesMutation] = useCreateBlockWithTimesMutation();
    const [{data, fetching}] = useMeQuery();
    console.log("ME Data:", data);
    const getNormalizedGCalDateEvent = (date) => {
      const userId = data.me.id;
      const [ refresh_token_data ] = useGetRefreshTokenQuery({
        variables: {userId}
      });
      
      // const refresh = refresh_token_data
      console.log("GETTING NORMALIZED DATE EVENT!!!");
      // axios.post('http://localhost:4000/api/get-daily-events', { date, refresh_token_data }, {withCredentials: true})
      axios.post('http://localhost:4000/api/get-daily-events', { date, refresh_token_data }, {withCredentials: true})

      .then((resp) => {
        console.log("IN GETGCALEVENTS!!!!")
        console.log(resp.data);
        if (resp.data) {
          let events = resp.data.data.items;
          const valArr = [];
    
          Object.values(events).forEach((val) => {
            let internal_val = [];
            Object.entries(val).forEach((iv) => {
              internal_val.push(iv);
              // console.log("INTERNAL VAL")
              // console.log(internal_val);
            });
            valArr.push(internal_val);
          })
          var completeArrForThisEvent = [];
          if (valArr) {
            console.log("value arr length:");
            console.log(valArr.length);
            valArr.forEach((overlyingevent : string[][]) => {
              const title = overlyingevent[7][1]; // summary
              const start_as_json : string = Object.values(overlyingevent[10][1])[0];
              const start = (new Date(start_as_json)).toISOString();

              const end = (new Date(Object.values(overlyingevent[11][1])[0])).toISOString();
              console.log("SETTING BLOCK!!!")            
              createBlockWithTimesMutation({
                startDateTime: start,
                endDateTime: end,
                input: { title: title, description: ""}
  
              });
              // createBlockMutation({
              //   input: { title: title, description: ""}
              // })
              // setBlockMutation({
              //   id: 100,
              //   ,
                // startDateTime: start,
                // endDateTime: end,
              // });
            })
          }
        }
      })
      .catch((err) => console.log(err.message));
    };
  
    console.log("in index");
    // if (axios.defaults.proxy) {
    //   axios.defaults.proxy.host = "http://localhost:4000";
    //   console.log("changed axios proxy");
    // }
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const [todoState, setTodoState] = useState('');
    let d = new Date();
    console.log(d);
    // d.setDay(d.getDay() - 1 );
    // d.setDate(30);
    const responseGoogle = (resp) => {
      console.log(resp);
      const { code } = resp;
      axios
        .post('http://localhost:4000/api/create-tokens', { code })
        .then((resp) => {
          // maybe call the get handler function here, put every google event into a Block. 
          
          // might need to post here instead of calling a function, and then push result to createBlocks
          setSignedIn(true);
          
          getNormalizedGCalDateEvent(d);
          console.log(resp.data);
          setSignedIn(true);
        })
        .catch((err) => console.log(err.message));
    };
  
    const getGCalDateEvent = (date): (Array<Object> | undefined) => {
  
      axios.post('http://localhost:4000/api/get-daily-events', { date })
      .then((resp) => {
        console.log("IN GETGCALEVENTS!!!!")
        console.log(resp.data);
        
        
        if (resp.data) {
          let events = resp.data.data.items;
          
          events.forEach(ev => {
            console.log(ev);
            console.log(ev.summary);
            console.log(ev.end.dateTime);
            console.log(ev.start.dateTime);
            if (ev.description) {
              console.log("has description", ev.description);
            }
            else {
              console.log("no desc!!!!");
            }
          }
          );
          eventList = events;
          console.log(eventList);
          console.log(" RETURNING A NON-UNDEFINED PROP!")
          return events;
  
        } else {
          return undefined;
        }
        // return undefined;
      })
      .catch((err) => console.log(err.message));
      return undefined;
    };
  
    const getDayEvents = (e) => {
      e.preventDefault();
      // const newDate = date.concat("T00:00:00Z");
  
      // 2022-04-07T00:00:00Z
      // 2022-04-07T23:59:00Z
      // console.log(newDate);
      // return false;
      axios.post('http://localhost:4000/api/get-daily-events', { date })
      .then((resp) => {
  
        console.log(resp.data);
        
        
        if (resp.data) {
          let events = resp.data.data.items;
          console.log("TYPE::");
          console.log(typeof(resp.data.data.items[0]));
          events.forEach(ev => {
            console.log(ev);
            console.log(ev.summary);
            console.log(ev.end.dateTime);
            console.log(ev.start.dateTime);
            if (ev.description) {
              console.log("has description", ev.description);
            }
            else {
              console.log("no desc!!!!");
            }
          });
        }
      })
      .catch((err) => console.log(err.message));
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(summary, description, location, startDateTime, endDateTime);
      axios.post('http://localhost:4000/api/create-event', {summary,description, location, startDateTime, endDateTime})
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err.message));
    }
  
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [date, setDate] = useState('');
    const [signedIn, setSignedIn] = useState(false);
  
    const responseError = (err) => {
      console.log("---------------------------------- Error ----------------------------------");
      console.log(err);
    };
  
    let eventList = [];
    const gcalevents = getGCalDateEvent(d);
    console.log("GCALEVENTS:");
    console.log(gcalevents);

    // return (
    //     <Layout variant="regular">

    //     </Layout>
    // )

    return (
      // if the user is not login, show them a different page.
   
   
   <div>
        
        {
          // !signedIn ? 
          false ?
          (
  <div>
    
    {/* <Box justify-content= {"center"}
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
          </Box> */}
        </div>
          )
          : (
      //       <div>
          
      //     <div> 
      //       <form onSubmit={handleSubmit}> 
      //       <label htmlFor="summary">Summary 
            
      //       </label>
      //       <br />
      //       <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
      //       <br />
    
      //       <label htmlFor="description">Description 
            
      //       </label>
      //       <br />
      //       <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
      //       <br />
    
      //       <label htmlFor="location">Location 
            
      //       </label>
      //       <br />
      //       <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
      //       <br />
      //       <label htmlFor="startDateTime">StartDateTime 
            
      //       </label>
      //       <br />
      //       <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} />
      //       <br />
      //       <label htmlFor="endDateTime">End Date Time 
            
      //       </label>
      //       <br />
      //       <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} />
      //       <br />
      //       <button type='submit'> create event </button>
      //       </form>
      //     </div>
      //     <div> 
  
      //     </div>
      //     <br />
      //     <br />
      //     <br />
  
      //     <form onSubmit={ getDayEvents }> 
      //     <label htmlFor="date">Get this date's events.
            
      //       </label>
      //       <br />
  
      //     <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
            
  
      //     <button type='submit'>
      //       Print the day's events
      //     </button>
      //     </form>
      //     </div>
      //     )
      //   }
        
        
  
  
      <Layout variant="regular">
        <MainPage date={d}/>
       
      </Layout>
          )}
      </div>
  // 
    
    );
  };
  
//   export default Index;
// export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
export default withUrqlClient(createUrqlClient, {ssr: false})(Index);
