import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Center, Container, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {
  useCreateBlockMutation,
  useUnassignedBlocksQuery,
} from "../generated/graphql";
import { Block } from "./Block";

interface InboxProps {
  date: Date;
}

/* 
  Add a dropdown and center this inbox so that the user can choose to hide the tasks they didn't get done yesterday. 
  somehow I need to use a UseState variable in order to dynamically refresh the components. 
  Also need to do this for the schedule component. 

  IN order to deal with this, I need to separate the Backend w frontend logic.
  Store an array of the day's tasks in this component. When each Block is pressed, add it to
  the Schedule component. 
*/

export const Inbox: React.FC<InboxProps> = ({ date }) => {
  const [inboxList, setInboxList] = useState([]);

  const [result, reexecuteQuery] = useUnassignedBlocksQuery();
  const { data, fetching, error } = result;

  const [createBlock, createBlockMutation] = useCreateBlockMutation();
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Box borderWidth="3px" borderRadius="lg">
      <Center bg="tomato" h="100px" color="white">
        Task Inbox
      </Center>
      <IconButton
        aria-label="new task"
        icon={<PlusSquareIcon />}
        onClick={() => {
          // might want to add the ID here
          createBlockMutation({ input: { title: "", description: "" } });
          reexecuteQuery();
          
          console.log("pressed new task button");
        }}
      ></IconButton>
      {/* <div> {date.toISOString()} </div> */}

      {/* {inboxList.map((block) => {
        <Block title={block.title} id={block.id} date={date} />;
      })} */}

      {data.unassignedBlocks.map((block) => (
            <Block title= {block.title} id={block.id} date={date}/>
          //   {" "}
          //   {block.id} {block.title}{" "}
          //  {block.startDateTime }


      ))}
    </Box>
  );
};
