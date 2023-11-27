import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Flex, Text } from '@chakra-ui/react';

const FocusTimeModal = ({ isOpen, onClose, taskTitle, taskNotes }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      
      <ModalContent
        width="42%"
        height="60%"
        borderRadius="10px"
        boxShadow="2px 5px 50px 0px #2425281A"
        bg="#FFFFFF"
      >
        <Flex justifyContent="space-between" width="67%" ml = "5%" mt = "4%" mb = "3.6%">
          <Text
              color="#1F1F1F"
              fontFamily="DM Sans"
              fontSize="13px"
              fontWeight="700"
              lineHeight="15.24px"
              letterSpacing="0em"
          >
            Pomodoro
          </Text>
          <Text
              color="#1F1F1F"
              fontFamily="DM Sans"
              fontSize="13px"
              fontWeight="700"
              lineHeight="15.24px"
              letterSpacing="0em"
          >
            Short Break
          </Text>
          <Text
              color="#1F1F1F"
              fontFamily="DM Sans"
              fontSize="13px"
              fontWeight="700"
              lineHeight="15.24px"
              letterSpacing="0em"
          >
            Long Break
          </Text>

        </Flex>


        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          marginBottom = '47.5%'
        >

          <Box
            bg="#F5F7F9"
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%" // Adjust this value based on your needs
            width="90%"
            borderRadius="10px 10px 0 0"
            >

            <Text
            color="#1F1F1F"
            fontFamily="DM Sans"
            fontSize="73"
            fontWeight="700"
            lineHeight="50%"
            letterSpacing="0em"
            mt = "10%"
            >
              25:00
            </Text>
            <Button
              position="absolute"
              bottom="51.6%" // Adjust the position as needed
              //right="20px" // Adjust the position as needed
              bg="#6284FF"
              color="white"
              borderRadius = "10px"
              w = "26.3%"
              h = "9%"
              boxShadow="0px 4px 80px 0px #6284FF33"
              _hover={{ bg: '#4B6DE9' }}
            >
              <Text
                color="#FFFFFF"
                fontFamily="DM Sans"
                fontSize="14"
                fontWeight="700"
                lineHeight="42.6%"
                letterSpacing="0em"
                //mt = "10%"
              >
              Start
              </Text>
            </Button>
            </Box>
            {/*Task: {taskTitle}
            Task: {taskNotes}*/}
          </Flex>
          

        <ModalCloseButton>
          <CloseIcon />
        </ModalCloseButton>

      </ModalContent>

    </Modal>
  );
};
const CloseIcon = () => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.16998 14.83L14.83 9.17" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.83 14.83L9.16998 9.17" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  )
}



export default FocusTimeModal;
