import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "urql";
import { useBlocksQuery } from "../generated/graphql";
import { dateIsToday } from "../utils/dateIsToday";
import { getHourFromDateString } from "../utils/getHourFromDateString";
import { numericalMonthToWord } from "../utils/numericalMonthToWord";
import { Block } from "./Block";
import { ScheduleBlock } from "./ScheduleBlock";

interface ScheduleProps {
  date: Date;
}

export const Schedule: React.FC<ScheduleProps> = ({ date }) => {
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
  console.log("The current date is: ");
  console.log(date.toISOString());
  const [result, reexecuteQuery] = useBlocksQuery({
    variables: { date: date.toISOString() },
  });
  console.log("result finished");
  // console.log(date);
  // console.log(date.getDate());
  // const hours = [...Array(24).keys()];
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const { data, fetching, error } = result;

console.log(data);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Box borderWidth="3px" borderRadius="lg">
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
          <div>
            <ScheduleBlock
              hour={hour}
              block={data.blocks.find(
                (b) => parseInt(getHourFromDateString(b.startDateTime)) === hour
              )}
            />
          </div>

          //  data.blocks.find(
          //   (hour === data.blocks.find((B) => parseInt(getHourFromDateString(B.startDateTime)) ) ) => (
          //       <div>{parseInt(getHourFromDateString(Block.startDateTime)) === hour}</div>
          //   )
        ))}
      </Stack>
    </Box>
  );
};
