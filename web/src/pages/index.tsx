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
import { useMutation, useQuery } from "urql";
import { Block } from "../components/Block";
import { Inbox } from "../components/Inbox";
import { Schedule } from "../components/Schedule";
import { useBlocksQuery } from "../generated/graphql";
// import {getCurrentDate} from '../utils/getCurrentDate'

const Index = () => {
  // const [{ data, error, fetching } ]
  let d = new Date();
  // d.setDay(d.getDay() - 1 );
  d.setDate(30);

  return (
    // if the user is not login, show them a different page.
    <Grid templateColumns="repeat(2, 1fr)">
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
  );
};

export default Index;
