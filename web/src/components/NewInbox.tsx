import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import {
  useCreateBlockMutation,
  useUnassignedBlocksQuery,
} from "../generated/graphql";
import { Block } from "./Block";

interface InboxProps {
  date: Date;
}

export const NewInbox: React.FC<InboxProps> = ({ date }) => {
  const [result, reexecuteQuery] = useUnassignedBlocksQuery();
  const { data, fetching, error } = result;

  const [createBlock, createBlockMutation] = useCreateBlockMutation();
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
      <Stack>
    <Flex
      align="center"
      justifyContent={"center"}
      // >
      //  zIndex={1}
      //  position="sticky"
      //  top={0}
      bg="green.300"
      p={4}
    >
      <Center>
        <Text>Good Morning</Text>
      </Center>
    </Flex>

    
        <Center>
        <Text>
          
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
          Add a new task
        </Text>
        
      </Center>
      {data.unassignedBlocks.map((block) => (
          <Block title={block.title} id={block.id} date={date} />
          //   {" "}
          //   {block.id} {block.title}{" "}
          //  {block.startDateTime }
        ))}
    </Stack>
  );
};
