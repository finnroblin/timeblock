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
import {
  useSetBlockMutation,
  useUpdateBlockTimesMutation,
} from "../generated/graphql";
import { Field, Form, Formik } from "formik";
import axios from "axios";

export const Block = (props) => {
  const [updateTimes, updateTimesMutation] = useUpdateBlockTimesMutation();
  const [setBlock, setBlockMutation] = useSetBlockMutation();
  const router = useRouter();
  let titleStr = "";
  let id = 11;
  const dateFirstPartString = props.date.toISOString().substring(0, 11);
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
      onSubmit={async (values, { resetForm }) => {
        // console.log(props.date.toISOString());
        // console.log(props.date.toISOString().substring(0,11));
        console.log("BLOCK SUBMIT!!");
        console.log(`submitting form with startTime ${values.startTime}`);
        console.log(`value for title: ${values.title}`);
        console.log(`on block ID: ${id}`);
        let title = values.title;
        let description = values.description;
        let sdt = ``;
        console.log(values.startTime);
        if (values.startTime < 10) {
          sdt = `${dateFirstPartString}0${values.startTime}:00:00.819Z`;
        } else {
          sdt = `${dateFirstPartString}${values.startTime}:00:00.819Z`;
        }
        let edt = ``;
        console.log("End time:");
        console.log(values.endTime);
        if (values.endTime < 10) {
          edt = `${dateFirstPartString}0${values.endTime}:00:00.819Z`;
        } else {
          edt = `${dateFirstPartString}${values.endTime}:00:00.819Z`;
        }

        await setBlockMutation({
          id: id,
          input: { title: title, description: description },
          startDateTime: sdt,
          endDateTime: edt,
        }).then(async (newUpdatedBlock) => {
          let sdt_as_date = new Date(sdt).toISOString();
          let edt_as_date = new Date(edt).toISOString();
          let loc = "PLACEHODLER LOCATION";
          console.log("SDT AS DATE: ", sdt_as_date);
          console.log("edt AS DATE: ", edt_as_date);
          console.log("POSTING TO API!!!!");

          // then somehow update the schedule state, 


          await axios
            .post("http://localhost:4000/api/create-event", {
              title,
              description,
              loc,
              sdt,
              edt,
            })
            .then((resp) => {
              console.log(resp.data);
              resetForm({
                values: {
                  title: "",
                  description: "",
                  startTime: "",
                  endTime: "",
                },
              });
              window.location.reload();
            })
            .catch((err) => {console.log(err.message)
              window.location.reload();
            });
          
        });

        // router.push("/");
      }}
    >
      {(props) => (
        <Form>
          {/* <InputGroup onSubmit={() => {console.log("testing")}}> */}
          <Grid
            flexDirection={["column", "row"]}
            templateColumns="repeat(5, 1fr)"
          >
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
              <Field name="description">
                {({ field, form }) => (
                  <FormControl>
                    {/* <FormLabel htmlFor="description"> Title</FormLabel> */}
                    <Input
                      {...field}
                      type="text"
                      placeholder="desc"
                      focusBorderColor="green.300"
                      id="description"
                      name="description"
                    />
                  </FormControl>
                )}
              </Field>
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
              <Field name="endTime">
                {({ field, form }) => (
                  <FormControl>
                    {/* <FormLabel htmlFor="endTime"> Title</FormLabel> */}
                    <Input
                      {...field}
                      type="number"
                      placeholder="endTime"
                      id="endTime"
                      name="endTime"
                    />
                  </FormControl>
                )}
              </Field>
              {/* <Input type="number" name="endTime" placeholder="endTime" /> */}
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
