import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { useMutation, useQuery } from "urql";
import { Block } from "../components/Block";
import { Inbox } from "../components/Inbox";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { Schedule } from "../components/Schedule";
import { useBlocksQuery } from "../generated/graphql";
import axios from "axios";
import { useState } from "react";
import { NewInbox } from "../components/NewInbox";
// import {getCurrentDate} from '../utils/getCurrentDate'

const Index = () => {
  // const [{ data, error, fetching } ]
  console.log("in index");
  if (axios.defaults.proxy) {
    axios.defaults.proxy.host = "http://localhost:4000";
    console.log("changed axios proxy");
  }
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
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
        console.log(resp.data);
        setSignedIn(true);
      })
      .catch((err) => console.log(err.message));
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
    console.log(err);
  };
  return (
    // if the user is not login, show them a different page.
//     <div>
//       <h1>Google Calendar API</h1>
//       {
//         !signedIn ? (
// <div>
//         <GoogleLogin
//           clientId="597602837391-n16324cfeevmthbldne784pke8n05q2e.apps.googleusercontent.com"
//           buttonText="Sign in & authorize calendar"
//           onSuccess={responseGoogle}
//           onFailure={responseError}
//           cookiePolicy={"single_host_origin"}
//           responseType="code"
//           accessType="offline" // allows us to use code on backend, so can access calendar when user is offline
//           scope="openid email profile https://www.googleapis.com/auth/calendar"
//           // code; 4/0AX4XfWhsfBJf_9Gc013JrYMqDLscRdaciHx8Rj-vzThBbuAWCJFssb5raDAGX7ccPfHC9A
//         />
//       </div>
//         )
//         : (
//           <div>
        
//         <div> 
//           <form onSubmit={handleSubmit}> 
//           <label htmlFor="summary">Summary 
          
//           </label>
//           <br />
//           <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
//           <br />
  
//           <label htmlFor="description">Description 
          
//           </label>
//           <br />
//           <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
//           <br />
  
//           <label htmlFor="location">Location 
          
//           </label>
//           <br />
//           <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
//           <br />
//           <label htmlFor="startDateTime">StartDateTime 
          
//           </label>
//           <br />
//           <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} />
//           <br />
//           <label htmlFor="endDateTime">End Date Time 
          
//           </label>
//           <br />
//           <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} />
//           <br />
//           <button type='submit'> create event </button>
//           </form>
//         </div>
//         <div> 

//         </div>
//         <br />
//         <br />
//         <br />

//         <form onSubmit={ getDayEvents }> 
//         <label htmlFor="date">Get this date's events.
          
//           </label>
//           <br />

//         <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
          

//         <button type='submit'>
//           Print the day's events
//         </button>
//         </form>
//         </div>
//         )
//       }
      
      
//     </div>


    <Layout variant="regular">
      
      <NewInbox date={d}>

      </NewInbox>
      <Grid width={"100%"} height={"100%"}
      templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Container>
            <Inbox date={d} />
          </Container>
        </GridItem>
        <GridItem>
          <Container>
            <Schedule date={d} />
          </Container>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Index;
