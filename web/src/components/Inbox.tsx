import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Center, Container, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  useCreateBlockMutation,
  useUnassignedBlocksQuery,
} from "../generated/graphql";
import { Block } from "./Block";

interface InboxProps {
  date: Date;
  val: boolean;
  updater: React.Dispatch<React.SetStateAction<boolean>>;
}

/* 
  Add a dropdown and center this inbox so that the user can choose to hide the tasks they didn't get done yesterday. 
  somehow I need to use a UseState variable in order to dynamically refresh the components. 
  Also need to do this for the schedule component. 

  IN order to deal with this, I need to separate the Backend w frontend logic.
  Store an array of the day's tasks in this component. When each Block is pressed, add it to
  the Schedule component. 
*/

export const Inbox: React.FC<InboxProps> = ({ date, val, updater }) => {
  const [inboxList, setInboxList] = useState([]);

  const [result, reexecuteQuery] = useUnassignedBlocksQuery();
  const { data, fetching, error } = result;

  const [createBlock, createBlockMutation] = useCreateBlockMutation();
  // const initialUnassignedBlocks = typeof data.unassignedBlocks !== undefined ? [] : data.unassignedBlocks;
  // const initialUnassignedBlocks = data.unassignedBlocks ? [] : data.unassignedBlocks;

  const [unassignedblockslist, setunassignedblockslist] = useState([]);
  const [counter, updateCounter] = useState(0);
  // unassignedblockslist.forEach((block) => {
  //   console.log(block);
  // })
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box borderWidth="3px" borderRadius="lg">
      <Center bg="tomato" h="100px" color="white">
        Task Inbox
      </Center>
      {/* {val ? (
        <Text>State is currently true</Text>
      ) : (
        <Text>State is currently false</Text>
      )} */}

      <IconButton
        aria-label="new task"
        icon={<PlusSquareIcon />}
        onClick={() => {
          updater(!val);
          updateCounter(counter + 1);
          // might want to add the ID here
          // ID is covered within the Block resolver.
          const result = createBlockMutation({
            input: {
              title: "placeholder",
              description: "",
              date: date.toLocaleDateString(),
            },
          }).then((res2) => {
            console.log(result);
            console.log(res2);
            console.log(res2.data.createBlock);

            // reexecuteQuery();
            const newUnassigendBlocks = data.unassignedBlocks.push(
              res2.data.createBlock
            );
            setunassignedblockslist(data.unassignedBlocks);
            console.log("pressed new task button");
          });
        }}
      ></IconButton>
      {/* <div> {date.toISOString()} </div> */}

      {/* {inboxList.map((block) => {
        <Block title={block.title} id={block.id} date={date} />;
      })} */}
      {unassignedblockslist.map((block) => (
        <Block title={block.title} id={block.id} date={date} />
      ))}
      {/* <Text>{counter}</Text> */}
      {/* {data.unassignedBlocks.map((block) => (
            <Block title= {block.title} id={block.id} date={date}/>
          //   {" "}
          //   {block.id} {block.title}{" "}
          //  {block.startDateTime }


      ))} */}
    </Box>
  );
};
