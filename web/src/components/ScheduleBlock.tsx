import { Box, Grid, GridItem } from "@chakra-ui/react"

export const ScheduleBlock = (props) => {

    // make it grey if there's no task scheduled here, blue otherwise.
    if (!props.block) {
        return  (
        <Box borderWidth="1px" borderRadius="lg"> 
        <div> {props.hour }</div>
        </Box>)
    }
    else {
        return (
        
        
        <Box borderWidth="1px" borderRadius="lg"> 
           
            <Grid
              maxW="100%"
              flexDirection={["column", "row"]}
              templateColumns="repeat(12, 1fr)"
            >
              <GridItem colSpan={1}>
              {props.hour}
                
              </GridItem>
              <GridItem w='100%'  colSpan={3}
              backgroundColor={"green.100"}> 
              {props.block.title}

              </GridItem>
              {/* Add icon button to expand, modal-style */}
              <GridItem backgroundColor={"gray.50"} colSpan={8} w='100%'>{props.block.description}</GridItem>
              {/* { block.startDateTime } */}
            </Grid>
        </Box>

        )
    }
    
}