import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ArrowRightIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useUpdateBlockTimesMutation } from "../generated/graphql";
import { Field, Form, Formik } from "formik";

export const Block = (props) => {
  const [updateTimes, updateTimesMutation] = useUpdateBlockTimesMutation();
  const router = useRouter();
  let titleStr = "";
  let id = 11;
  if (props.title) {
    titleStr = props.title;
  }
  if (props.id) {
    id = props.id;
  }
  return (
    
      <Formik
        initialValues={{
          title: titleStr,
          description: "",
          startTime: null,
          endTime: null,
          // it would be sick if we could have the next starttime be
          // right after the previous endtime
          // to do this, setup query on schedule to get "last" block
          // but maybe not the best behavior
        }}
        //   enableReinitialize
        onSubmit={async (values) => {
          console.log(`submitting form with startTime ${values.startTime}`);
          console.log(`value for title: ${values.title}`);
          console.log(`on block ID: ${id}`);
          let sdt = ``;
          if (values.startTime < 10) {
            sdt = `2022-01-06T0${values.startTime}:31:05.819Z`;
          } else {
            sdt = `2022-01-06T${values.startTime}:31:05.819Z`;
          }
          await updateTimesMutation({
            id: id,
            startDateTime: sdt,
            endDateTime: "2022-01-06T15:31:05.819Z",
          });
          router.push("/");
        }}
      >
        {(props) => ( 
          
          <Form>
            {/* <InputGroup onSubmit={() => {console.log("testing")}}> */}
    <Grid flexDirection={['column','row']} templateColumns='repeat(5, 1fr)'> 

            <GridItem>
            <Field name="title">
              {({ field, form }) => (
                <FormControl>
                  {/* <FormLabel htmlFor="title"> Title</FormLabel> */}
                  <Input
                    {...field}
                    placeholder="title"
                    focusBorderColor="red.300"
                    type="text"
                    id="title"
                  />
                </FormControl>
              )}
            </Field>
            </GridItem>

<GridItem>
            <Input
              placeholder="desc"
              focusBorderColor="green.300"
              type="text"
              name="description"
            />
</GridItem>
<GridItem>
            <Field name="startTime">
              {({ field, form }) => (
                <FormControl>
                  {/* <FormLabel htmlFor="startTime"> Title</FormLabel> */}
                  <Input
                    {...field}
                    type="number"
                    placeholder="startTime"
                    id="startTime"
                    name="startTime"
                  />
                </FormControl>
              )}
            </Field>
</GridItem>
<GridItem>
            <Input type="number" name="endTime" placeholder="endTime" />
            </GridItem>
            <GridItem>
            {/* <Input type={"date"} /> */}
            <IconButton
              aria-label="submit"
              type="submit"
              icon={<ArrowRightIcon />}
              isLoading={props.isSubmitting}
              // color="green.300"
              backgroundColor="green.300"
            />
            {/* </InputGroup> */}
            </GridItem>
    </Grid>

          </Form>
          
        )}
      </Formik>
  );
};
