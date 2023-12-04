import {useEffect, React, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
  Editable,
  HStack,
  EditablePreview,
  EditableTextarea,
  Spacer,
  useEditableControls,
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';
const FocusTimeModal = ({setNotes, isOpen, onClose, taskTitle, taskNotes }) => {
  
  const pomodoroNotesBox = useRef();
  const shortBreakNotesBox = useRef();
  const longBreakNotesBox = useRef();
  const [currentTab, setCurrentTab] = useState('pomodoro');
  const [currentNotes, setCurrentNotes] = useState(taskNotes);

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getEditButtonProps } = useEditableControls();
    

    return isEditing ? (
      <button {...getSubmitButtonProps()}>
        <EditIcon active={isEditing} />
      </button>
    ) : (
      <button {...getEditButtonProps()}>
        <EditIcon active={isEditing} />
      </button>
    );
  }
  
  const handleNotes = (value) => {
    if (taskNotes === value) return // If the notes actually changed
    console.log("vlue ", value)
    setCurrentNotes(value)
}

const handleTab = (value) => {
  
  //taskNotes = currentNotes
  setCurrentTab(value)


}

useEffect(() => {
  setNotes(currentNotes);
}, [currentNotes, setNotes]);

// Use useEffect to update currentNotes before the modal opens
useEffect(() => {
  console.log('isOpen:', isOpen);
  console.log('taskNotes:', taskNotes);

  if (isOpen) {
    console.log('Updating currentNotes:', taskNotes);
    setCurrentNotes(taskNotes);
  }
}, [isOpen, taskNotes]);



  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />

      <ModalContent width="42%" height="60%" borderRadius="10px" boxShadow="2px 5px 50px 0px #2425281A" bg="#FFFFFF">
        <Flex justifyContent="space-between" width="67%" ml="5%" mt="4%" mb="3.6%">
          <Tab title="Pomodoro" isActive={currentTab === 'pomodoro'} />
          <Tab title="Short Break" isActive={currentTab === 'shortBreak'} />
          <Tab title="Long Break" isActive={currentTab === 'longBreak'} />
        </Flex>

        {currentTab === 'pomodoro' && (
          <>
            <Flex direction="column" alignItems="center" justifyContent="center" h="100%">
              <Box
                bg="#F5F7F9"
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="100%"
                width="90%"
                borderRadius="8px 8px 8px 8px"
              >
                <Text
                  color="#1F1F1F"
                  fontFamily="DM Sans"
                  fontSize="73"
                  fontWeight="700"
                  lineHeight="50%"
                  letterSpacing="0em"
                  mt="10%"
                >
                  25:00
                </Text>
                <Button
                  position="absolute"
                  bottom="51.6%"
                  bg="#6284FF"
                  color="white"
                  borderRadius="10px"
                  w="26.3%"
                  h="9%"
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
                  >
                    Start
                  </Text>
                </Button>
              </Box>
            </Flex>
            <Text
              color="#000000"
              fontFamily="DM Sans"
              fontSize="16px"
              fontWeight="700"
              lineHeight="20%"
              letterSpacing="0em"
              mt="5%"
              ml="5%"
            >
              {taskTitle}
            </Text>

            <Flex direction="column" alignItems="center" mt="4%" h="100%">
              <Box bg="#F5F7F9" width="90%" height="45.6%" borderRadius="8px 8px 8px 8px">
                <Editable
                  key={uuidv4()}
                  width="100%"
                  defaultValue={currentNotes}
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  selectAllOnFocus={false}
                  ref={pomodoroNotesBox}
                  fontSize="11px"
                  lineHeight="14px"
                  fontFamily="DM Sans"
                  onSubmit={handleNotes}
                >
                  <HStack align="flex-start" mr="3%" mt="3%">
                    <Box w="100%">
                      <Text fontFamily="DM Sans" fontSize="13px" fontWeight="700" lineHeight="15.24px" color="#6284FF" ml="3%">
                        Notes:
                      </Text>
                      <EditablePreview maxH="6.2vh" overflowY="auto" marginLeft="3%" width="100%" />
                      <EditableTextarea
                        resize="none"
                        border="none"
                        width="100%"
                        height="6.2vh"
                        style={{ outlineColor: "#F5F7F9", boxShadow: "none", width: "100%", marginLeft: "3%" }}
                      />
                    </Box>
                    <Spacer />
                    <EditableControls />
                  </HStack>
                </Editable>
              </Box>
            </Flex>

            <Box
              bg="#252628"
              position="absolute"
              bottom="4.5%"
              ml="5%"
              width="90%"
              height="11.5%"
              borderRadius="8px 8px 8px 8px"
              borderWidth="1px"
              borderColor="#6284FF"
            >
              <HStack alignItems="center" mt="4.3%">
                <Flex direction="row" alignItems="center" ml="17.96%">
                  <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="5%">
                    Pomos:
                  </Text>
                  <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF">
                    0/3
                  </Text>
                </Flex>
                <Flex direction="row" alignItems="center" whiteSpace={'nowrap'} ml="7%">
                  <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="3%">
                    Finish At:
                  </Text>
                  <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF" >
                    19:53 (1.4h)
                  </Text>
                </Flex>
              </HStack>

            </Box>


          </>
          

        )}
        {currentTab === 'short break' && (
          <>
            <Flex direction="column" alignItems="center" justifyContent="center" h="100%">
              <Box
                bg="#F5F7F9"
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="100%"
                width="90%"
                borderRadius="8px 8px 8px 8px"
              >
                <Text
                  color="#1F1F1F"
                  fontFamily="DM Sans"
                  fontSize="73"
                  fontWeight="700"
                  lineHeight="50%"
                  letterSpacing="0em"
                  mt="10%"
                >
                  25:00
                </Text>
                <Button
                  position="absolute"
                  bottom="51.6%"
                  bg="#6284FF"
                  color="white"
                  borderRadius="10px"
                  w="26.3%"
                  h="9%"
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
                  >
                    Start
                  </Text>
                </Button>
              </Box>
            </Flex>
            <Text
              color="#000000"
              fontFamily="DM Sans"
              fontSize="16px"
              fontWeight="700"
              lineHeight="20%"
              letterSpacing="0em"
              mt="5%"
              ml="5%"
            >
              {taskTitle}
            </Text>

            <Flex direction="column" alignItems="center" mt="4%" h="100%">
              <Box bg="#F5F7F9" width="90%" height="45.6%" borderRadius="8px 8px 8px 8px">
                <Editable
                  key={uuidv4()}
                  width="100%"
                  defaultValue={currentNotes}
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  selectAllOnFocus={false}
                  ref={shortBreakNotesBox}
                  fontSize="11px"
                  lineHeight="14px"
                  fontFamily="DM Sans"
                  onSubmit={handleNotes}
                >
                  <HStack align="flex-start" mr="3%" mt="3%">
                    <Box w="100%">
                      <Text fontFamily="DM Sans" fontSize="13px" fontWeight="700" lineHeight="15.24px" color="#6284FF" ml="3%">
                        Notes:
                      </Text>
                      <EditablePreview maxH="6.2vh" overflowY="auto" marginLeft="3%" width="100%" />
                      <EditableTextarea
                        resize="none"
                        border="none"
                        width="100%"
                        height="6.2vh"
                        style={{ outlineColor: "#F5F7F9", boxShadow: "none", width: "100%", marginLeft: "3%" }}
                      />
                    </Box>
                    <Spacer />
                    <EditableControls />
                  </HStack>
                </Editable>
              </Box>
            </Flex>

            <Box
              bg="#252628"
              position="absolute"
              bottom="4.5%"
              ml="5%"
              width="90%"
              height="11.5%"
              borderRadius="8px 8px 8px 8px"
              borderWidth="1px"
              borderColor="#6284FF"
            >
              <HStack alignItems="center" mt="4.3%">
                <Flex direction="row" alignItems="center" ml="17.96%">
                  <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="5%">
                    Pomos:
                  </Text>
                  <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF">
                    0/3
                  </Text>
                </Flex>
                <Flex direction="row" alignItems="center" whiteSpace={'nowrap'} ml="7%">
                  <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="3%">
                    Finish At:
                  </Text>
                  <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF" >
                    19:53 (1.4h)
                  </Text>
                </Flex>
              </HStack>

            </Box>


          </>
        )}
        {currentTab === 'long break' && (
          <>
          <Flex direction="column" alignItems="center" justifyContent="center" h="100%">
            <Box
              bg="#F5F7F9"
              display="flex"
              flexDirection="column"
              alignItems="center"
              height="100%"
              width="90%"
              borderRadius="8px 8px 8px 8px"
            >
              <Text
                color="#1F1F1F"
                fontFamily="DM Sans"
                fontSize="73"
                fontWeight="700"
                lineHeight="50%"
                letterSpacing="0em"
                mt="10%"
              >
                25:00
              </Text>
              <Button
                position="absolute"
                bottom="51.6%"
                bg="#6284FF"
                color="white"
                borderRadius="10px"
                w="26.3%"
                h="9%"
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
                >
                  Start
                </Text>
              </Button>
            </Box>
          </Flex>
          <Text
            color="#000000"
            fontFamily="DM Sans"
            fontSize="16px"
            fontWeight="700"
            lineHeight="20%"
            letterSpacing="0em"
            mt="5%"
            ml="5%"
          >
            {taskTitle}
          </Text>

          <Flex direction="column" alignItems="center" mt="4%" h="100%">
            <Box bg="#F5F7F9" width="90%" height="45.6%" borderRadius="8px 8px 8px 8px">
              <Editable
                  key={uuidv4()}
                  width="100%"
                  defaultValue={currentNotes}
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  selectAllOnFocus={false}
                  ref={longBreakNotesBox}
                  fontSize="11px"
                  lineHeight="14px"
                  fontFamily="DM Sans"
                  onSubmit={handleNotes}
                >
                <HStack align="flex-start" mr="3%" mt="3%">
                  <Box w="100%">
                    <Text fontFamily="DM Sans" fontSize="13px" fontWeight="700" lineHeight="15.24px" color="#6284FF" ml="3%">
                      Notes:
                    </Text>
                    <EditablePreview maxH="6.2vh" overflowY="auto" marginLeft="3%" width="100%" />
                    <EditableTextarea
                      resize="none"
                      border="none"
                      width="100%"
                      height="6.2vh"
                      style={{ outlineColor: "#F5F7F9", boxShadow: "none", width: "100%", marginLeft: "3%" }}
                    />
                  </Box>
                  <Spacer />
                  <EditableControls />
                </HStack>
              </Editable>
            </Box>
          </Flex>

          <Box
            bg="#252628"
            position="absolute"
            bottom="4.5%"
            ml="5%"
            width="90%"
            height="11.5%"
            borderRadius="8px 8px 8px 8px"
            borderWidth="1px"
            borderColor="#6284FF"
          >
            <HStack alignItems="center" mt="4.3%">
              <Flex direction="row" alignItems="center" ml="17.96%">
                <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="5%">
                  Pomos:
                </Text>
                <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF">
                  0/3
                </Text>
              </Flex>
              <Flex direction="row" alignItems="center" whiteSpace={'nowrap'} ml="7%">
                <Text fontFamily="DM Sans" fontSize="15px" fontWeight="700" lineHeight="15px" color="white" mr="3%">
                  Finish At:
                </Text>
                <Text fontFamily="DM Sans" fontSize="15px" lineHeight="15px" color="#6284FF" >
                  19:53 (1.4h)
                </Text>
              </Flex>
            </HStack>

          </Box>


        </>
        )}


        

        <ModalCloseButton position="absolute" top="1%" right="1%">
          <CloseIcon />
        </ModalCloseButton>
      </ModalContent>
    </Modal>
  );
function Tab({ title }) {
  const isActive = currentTab === title.toLowerCase();
  

  return (
    
    <Box position="relative">
      <Text
        key={title}
        color={isActive ? '#6284FF' : '#1F1F1F'}
        fontFamily="DM Sans"
        fontSize="13px"
        fontWeight="700"
        lineHeight="15.24px"
        letterSpacing="0em"
        cursor="pointer"
        //onClick={() => setCurrentTab(title.toLowerCase())}
        onClick={() => handleTab(title.toLowerCase())}

      >
        {title}
      </Text>

      {isActive && (
        <Box
          position="absolute"
          width="37.5%"
          height="3px"  
          bg="#6284FF"  
          borderRadius="3px" 
          mt = "6.5%"
        />
      )}
    </Box>
  );
}
}


const CloseIcon = () => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.16998 14.83L14.83 9.17" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.83 14.83L9.16998 9.17" stroke="#AEB9C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  )
}

const EditIcon = ({
  active
}) => {
  if (active) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10 8" fill="none">
        <path
          d="M3.55523 7.77551C3.43946 7.89796 3.27545 8 3.13073 8C2.98601 8 2.822 7.89286 2.7014 7.77041L0 4.91327L0.858659 4.0051L3.13555 6.41326L9.15581 0L10 0.923469L3.55523 7.77551Z"
          fill="#6284FF" />
      </svg>
    )
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8.84006 2.39997L3.36673 8.1933C3.16006 8.4133 2.96006 8.84664 2.92006 9.14664L2.6734 11.3066C2.58673 12.0866 3.14673 12.62 3.92006 12.4866L6.06673 12.12C6.36673 12.0666 6.78673 11.8466 6.9934 11.62L12.4667 5.82664C13.4134 4.82664 13.8401 3.68664 12.3667 2.2933C10.9001 0.913305 9.78673 1.39997 8.84006 2.39997Z"
          stroke="#6284FF" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round"
          strokeLinejoin="round" />
        <path d="M7.92676 3.36667C8.21342 5.20667 9.70676 6.61334 11.5601 6.8" stroke="#6284FF"
          strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 14.6667H14" stroke="#6284FF" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round"
          strokeLinejoin="round" />
      </svg>
    )
  }
}



export default FocusTimeModal;
