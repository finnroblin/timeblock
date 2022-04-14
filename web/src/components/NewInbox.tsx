import {
    Box,
    Center,
    Flex,
    Text
 } from "@chakra-ui/react"

interface InboxProps {
    date: Date;
  }
  

export const NewInbox: React.FC<InboxProps> = ({ date }) => {
    return (
        
        <Flex align="center" justifyContent={"center"}
        // >
        //  zIndex={1} 
        //  position="sticky" 
        //  top={0} 
         bg="green.300"
          p={4} 
          >
            <Center> 
            
                <Text>
                    Good Morning
                </Text>

                

                 
            
            </Center>
            </Flex>
        
    )
}