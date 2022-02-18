import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    
      
      <>
        <Button onClick={onOpen}>About</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor={"white"}>
            <ModalHeader>About Simple Timeblock</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                A timeblocking webapp developed to be effective and distraction-free.
                Place the day's tasks in the left inbox, specify their timeframes, and 
                they will be sent to that day's schedule.
                Timeblocking is highly effective at maximizing working time.
                I was introduced to this concept by Cal Newport, who introduces it here:
                <a href="https://www.calnewport.com/blog/2013/12/21/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/" >link </a> 
                Coming soon: Support for multiple-day blocking and time tracking
                (possibly through a browser extension?)
                Ideas/questions/bugs? I'd love to hear them, shoot me an email at: finn dot s dot roblin at gmail dot com
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    
  );
};
