import React, { useState } from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Grid, GridItem, Container } from "@chakra-ui/react";
import { Inbox } from "./Inbox";
import { NewInbox } from "./NewInbox";
import { Schedule } from "./Schedule";
import axios from "axios";

interface MainPageProps {
    date: Date;
}

export const MainPage: React.FC<MainPageProps> = ({ date }) => {
    const [toUpdateAssignedBlocks, setToUpdateAssignedBlocks] = useState(false);
    console.log("checking api");
    axios.get('https://zblock2-env.eba-dtmnwmak.us-west-1.elasticbeanstalk.com/api')
      .then((resp) => {
        console.log("In the main page, posting to api")
        // console.log("api resp: ", resp)
      })
  return (
    <>
      <NewInbox date={date} />

      {/* </NewInbox> */}
      <Grid width={"100%"} height={"100%"} templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Container>
            <Inbox date={date} val={toUpdateAssignedBlocks} updater={setToUpdateAssignedBlocks} />
          </Container>
        </GridItem>
        <GridItem>
          <Container>
            {/* <Schedule date={d} gcalevents={getGCalDateEvent(d, eventList)} evlist={eventList} /> */}
            <Schedule date={date} val={toUpdateAssignedBlocks} updater={setToUpdateAssignedBlocks} />
            {/* //  gcalevents={getGCalDateEvent(d, eventList)} evlist={eventList} /> */}

            {/* <Schedule date={d} gcalevents={gcalevents} /> */}
          </Container>
        </GridItem>
        {/* <Text> */}
        {/* {(fetching ? "loading" : data.me.id)} */}
        {/* </Text> */}
      </Grid>
    </>
  );
};
