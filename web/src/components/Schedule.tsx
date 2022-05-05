import {
  Box,
  Text,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  VStack,
  useUpdateEffect,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "urql";
import { useBlocksQuery, useSetBlockMutation } from "../generated/graphql";
import { dateIsToday } from "../utils/dateIsToday";
import { getHourFromDateString } from "../utils/getHourFromDateString";
import { numericalMonthToWord } from "../utils/numericalMonthToWord";
import { Block } from "./Block";
import { ScheduleBlock } from "./ScheduleBlock";

interface ScheduleProps {
  date: Date;
  val: boolean;
  updater: React.Dispatch<React.SetStateAction<boolean>>;
  // gcalevents: Object | undefined;
  // evlist: Array<Object>;
}

export const Schedule: React.FC<ScheduleProps> = ({
  date, val, updater
}) => {
  

  // get the Schedule for this date, then build it out

  // loop through each block in the schedule (by their starttime and endtime),
  // display it with the numbers to the left

  // if (dateIsToday(date)) {
  //     return <div> Today's date: {date.toDateString()} </div>
  // } else {
  //     return <div> Not today's date. </div>
  // }

  //     const [, getBlock] = useQuery({query:
  //         `
  // query Block($id: Int!) {
  //     block(id: $id) {
  //       id
  //       inboxId
  //       title
  //       createdAt
  //       updatedAt
  //       startDateTime
  //     }
  //   }
  // `});

  const [hasPulledEvents, setHasPulledEvents] = useState(false);
  const [setBlock, setBlockMutation] = useSetBlockMutation();

  

  // const getGCalDateEvent = (date): Array<Object> | undefined => {
  //   axios
  //     .post("http://localhost:4000/api/get-daily-events", { date })
  //     .then((resp) => {
  //       console.log("IN GETGCALEVENTS!!!!");
  //       // console.log(resp.data);

  //       if (resp.data) {
  //         let events = resp.data.data.items;

  //         events.forEach((ev) => {
  //           // console.log(ev);
  //           // console.log(ev.summary);
  //           // console.log(ev.end.dateTime);
  //           // console.log(ev.start.dateTime);
  //           // if (ev.description) {
  //           //   console.log("has description", ev.description);
  //           // } else {
  //           //   console.log("no desc!!!!");
  //           // }
  //         });
  //         // eventList = events;
  //         setHasPulledEvents(true);
  //         const res = Object.values(events);
  //         // .map((ev) => {String(ev)});
  //         console.log("RESSE");
  //         console.log(res);
  //         console.log(events);
  //         // const res = JSON.parse(events);
  //         // setEventList(events);
  //         setEventList(res);

  //         // console.log(eventList);
  //         // set the context here
  //         console.log(" RETURNING A NON-UNDEFINED PROP!");
  //         return events;
  //       } else {
  //         return undefined;
  //       }
  //       // return undefined;
  //     })
  //     .catch((err) => console.log(err.message));
  //   // return undefined;
  // };
  // console.log("EVLIST::");
  // console.log(evlist);
  const blocksQuery = `
    query Blocks {
        blocks {
          title
          description
          id
          startDateTime
        }
      }
    `;

  // let this_block = getBlock({id: 11})
  // const [result, reexecuteQuery] = useQuery({
  //     query: blocksQuery,
  //   });
  // console.log("The current date is: ");
  // console.log(date.toISOString());
  const [result, reexecuteQuery] = useBlocksQuery({
    variables: { date: date.toISOString() },
  });
  useUpdateEffect(() => {
    if (val) {
      console.log("UPDATED!!!")
      reexecuteQuery(); 
    }
  }, [val]) 
  // console.log("result finished");
  // console.log(date);
  // console.log(date.getDate());
  // const hours = [...Array(24).keys()];
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  // console.log("in schedule, gcalevents!");
  // console.log(gcalevents);
  // const [eventList, setEventList] = useState([]);
  // getGCalDateEvent(date);
  // console.log("EVENTLIST: ");

  // console.log(eventList);
  // // const vals = Object.values(eventList).forEach((val) => {
  // //   console.log("val #")
  // //   console.log(val);
  // //   Object.entries(val).forEach((internal_val) => {
  // //     console.log("INTERNAL VAL")
  // //     console.log(internal_val);
  // //   })
  // // })
  // const valArr = [];
  // const vals = Object.values(eventList).forEach((val) => {
  //   // console.log("val #")
  //   // console.log(val);
  //   let internal_val = [];
  //   Object.entries(val).forEach((iv) => {
  //     internal_val.push(iv);
  //     // console.log("INTERNAL VAL")
  //     // console.log(internal_val);
  //   });
  //   valArr.push(internal_val);
  // });
  // console.log("VALSVALSLVDIUOJIOFDJIOJFAIODAJ");
  // console.log(valArr);
  // var completeArrForThisEvent = [];

  // if (valArr) {
  //   valArr.forEach((overlyingevent) => {
  //     // console.log(valArr[0]);

  //     // if (valArr[0]) {
  //     console.log("Accesing specifc val!");

  //     completeArrForThisEvent.push(overlyingevent[7][1]); // summary
  //     // console.log(valArr[0][10]) // start
  //     // console.log(valArr[0][10][1])
  //     const start = new Date(Object.values(overlyingevent[10][1])[0]);
  //     completeArrForThisEvent.push(
  //       // Object.values(overlyingevent[10][1])[0]
  //       start.toISOString()
  //     ); // start datetime
  //     // values())
  //     const end = new Date(Object.values(overlyingevent[11][1])[0]);
  //     completeArrForThisEvent.push(
  //       // Object.values(overlyingevent[11][1])[0]
  //       end.toISOString()
  //     ); // end datetime
  //     // console.log(valArr[0][11]) // end

  //     // var arrDisp = valArr.map((outerEvent) => {
  //     //   <div>
  //     //     {outerEvent[0][1]}
  //     //     {outerEvent[3][1]}
  //     //   </div>;

  //       // var innerEvent = outerEvent.map( (iev) => {
  //       //   <div>
  //       //     {iev[]}
  //       //   </div>
  //     });
  // }
  // // completeArrForThisEvent = Object.values(completeArrForThisEvent);

  // console.log("ARR w TYPE: ", Array.isArray(completeArrForThisEvent));
  // console.log(completeArrForThisEvent);
  // console.log(Array.isArray(Object.values(completeArrForThisEvent)));

  const { data, fetching, error } = result;

  // console.log(data);
  const [blockList, setBlockList] = useState([]);

  // console.log(eventList);
  if (fetching ) {
    // || !hasPulledEvents) {
    // console.log("currently fetching/pulling events!");
    return <p>Loading...</p>;
  }
  if (error) return <p>Oh no... {error.message}</p>;
  console.log("Blocks")
  console.log(data.blocks);
  
  // if (val) {

  // }
  return (
    <Box borderWidth="3px" borderRadius="lg">
      {/* {val ? (
        <Text>State is currently true</Text>
      ) : (
        <Text>State is currently false</Text>
      )} */}
      <Center bg="tomato" h="100px" color="white">
        Schedule for {numericalMonthToWord(date.getUTCMonth())} {date.getDate()}
      </Center>

      <Stack direction={["row", "column"]} w="full" aria-orientation="vertical">
        {/* <div>
          {hours.map((key) => {
            {
              <div> {key} teiojtiojs </div>;
            }
          })}
        </div> */}

        {hours.map((hour) => (
          // const block_data = data.blocks.find( (b => parseInt(getHourFromDateString(b.startDateTime)) === hour) );
          //   const block_data = data.blocks.find( (b => parseInt(getHourFromDateString(b.startDateTime)) === hour) );
          //   const block_data = data.blocks.find( (b => parseInt(getHourFromDateString(b.startDateTime)) === hour) );
          // {
          //   const block_data = data.blocks.find( (b => parseInt(getHourFromDateString(b.startDateTime)) === hour) );
          // }
          /*
            some sort of 
          */
          
            <ScheduleBlock
            key = {hour}
              hour={hour}
              block={data.blocks.find(
                (b) => parseInt(getHourFromDateString(b.startDateTime)) === hour
              )}
            />
  

          //  data.blocks.find(
          //   (hour === data.blocks.find((B) => parseInt(getHourFromDateString(B.startDateTime)) ) ) => (
          //       <div>{parseInt(getHourFromDateString(Block.startDateTime)) === hour}</div>
          //   )
        ))}
      </Stack>
    </Box>
  );
};

// eventList ? (
  //   // 
  //   <Flex>
  //     <div>
  //       YES IT WORKED!!, # of events: {eventList.length}, type:{" "}
  //       {typeof eventList}
  //       <div>
  //         {completeArrForThisEvent.map( (entry) => {
  //           return (<div> 
  //             {}
  //             {entry}
  //           </div>)
  //         })}

  //         {/* {Object.values(eventList)} */}
  //         {/* {
  //           valArr.map((val) => {
  //             <div>
  //               {val.map((iv) => {
  //                 <div>{iv[0]}</div>;
  //               })}
  //             </div>;
  //           })
  //           // Object.values(eventList).map((val) => {
  //           //   <div> {val.summary}</div>;
  //           // })
  //         } */}
  //       </div>
  //       {/* <div>{Object.entries(eventList)}
  //       </div>
  //       {Object.keys(eventList).map((key) => {
  //         <div>
  //         <div> Event number x

  //         </div>
  //         <div>      
  //           {key.summary}
  //           {key.start.dateTime} */}
  //     </div>
  //     <Stack direction={["row", "column"]} w="full" aria-orientation="vertical">
  //       {eventList.map((ev) => {
  //         <div>
  //           <div> Event number x</div>
  //           <div>
  //             {ev.summary}
  //             {/* {ev.start.dateTime} */}
  //           </div>
  //         </div>;
  //       })}
  //     </Stack>
  //   </Flex>
  // ) : 




// [
  //   //     {
  //   //         "kind": "calendar#event",
  //   //         "etag": "\"3299818020666000\"",
  //   //         "id": "1oprrvs7jo1j12kb2fvnscqhau",
  //   //         "status": "confirmed",
  //   //         "htmlLink": "https://www.google.com/calendar/event?eid=MW9wcnJ2czdqbzFqMTJrYjJmdm5zY3FoYXUgZmlubmVyLnJvYmxpbkBt",
  //   //         "created": "2022-04-14T04:03:30.000Z",
  //   //         "updated": "2022-04-14T04:03:30.333Z",
  //   //         "summary": "some event",
  //   //         "creator": {
  //   //             "email": "finner.roblin@gmail.com",
  //   //             "self": true
  //   //         },
  //   //         "organizer": {
  //   //             "email": "finner.roblin@gmail.com",
  //   //             "self": true
  //   //         },
  //   //         "start": {
  //   //             "dateTime": "2022-04-14T06:00:00-04:00",
  //   //             "timeZone": "America/Detroit"
  //   //         },
  //   //         "end": {
  //   //             "dateTime": "2022-04-14T07:45:00-04:00",
  //   //             "timeZone": "America/Detroit"
  //   //         },
  //   //         "iCalUID": "1oprrvs7jo1j12kb2fvnscqhau@google.com",
  //   //         "sequence": 0,
  //   //         "reminders": {
  //   //             "useDefault": true
  //   //         },
  //   //         "eventType": "default"
  //   //     },
  //   //     {
  //   //         "kind": "calendar#event",
  //   //         "etag": "\"3299819302338000\"",
  //   //         "id": "4jjp45af8lp1efqehu82rm50o6",
  //   //         "status": "confirmed",
  //   //         "htmlLink": "https://www.google.com/calendar/event?eid=NGpqcDQ1YWY4bHAxZWZxZWh1ODJybTUwbzYgZmlubmVyLnJvYmxpbkBt",
  //   //         "created": "2022-04-14T04:14:11.000Z",
  //   //         "updated": "2022-04-14T04:14:11.169Z",
  //   //         "summary": "event 2",
  //   //         "description": "description of event 2, important!",
  //   //         "creator": {
  //   //             "email": "finner.roblin@gmail.com",
  //   //             "self": true
  //   //         },
  //   //         "organizer": {
  //   //             "email": "finner.roblin@gmail.com",
  //   //             "self": true
  //   //         },
  //   //         "start": {
  //   //             "dateTime": "2022-04-14T10:00:00-04:00",
  //   //             "timeZone": "America/Detroit"
  //   //         },
  //   //         "end": {
  //   //             "dateTime": "2022-04-14T11:45:00-04:00",
  //   //             "timeZone": "America/Detroit"
  //   //         },
  //   //         "iCalUID": "4jjp45af8lp1efqehu82rm50o6@google.com",
  //   //         "sequence": 0,
  //   //         "reminders": {
  //   //             "useDefault": true
  //   //         },
  //   //         "eventType": "default"
  //   //     }
  //   // ]