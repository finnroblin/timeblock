import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Center, Container, IconButton } from "@chakra-ui/react";
import { useCreateBlockMutation, useUnassignedBlocksQuery } from "../generated/graphql";
import { Block } from "./Block";

interface InboxProps {
  date: Date;
}

export const Inbox: React.FC<InboxProps> = ({ date }) => {
  const [result, reexecuteQuery] = useUnassignedBlocksQuery();
  const { data, fetching, error } = result;

  const [createBlock, createBlockMutation ] = useCreateBlockMutation();
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Box borderWidth="3px" borderRadius="lg">
    
      <Center bg='tomato' h='100px' color='white'>
        Task Inbox
</Center>
      <IconButton aria-label="new task" icon={<PlusSquareIcon />}
        onClick={ () => {
          createBlockMutation({input: { title: "", description: ""}})
            console.log("pressed new task button");
        }}
      ></IconButton>
      {/* <div> {date.toISOString()} </div> */}
      
      {data.unassignedBlocks.map((block) => (
          
          
            <Block title= {block.title} id={block.id}/>
          //   {" "}
          //   {block.id} {block.title}{" "}
          //  {block.startDateTime }


      ))}
    
    </Box>
  );
};
