import { useEffect, useState } from 'react'

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
} from '@chakra-ui/react'
import { setInterval, clearInterval } from 'worker-timers'

const Timer = ({
  isPomo,
  numPomos,
  numMinutes,
  numPomosComplete,
  updateNumPomosComplete,
  onTimerFinish,
  setIsTimerRunning,
  setTaskStatus,
}) => {
  const [minutes, setMinutes] = useState(numMinutes)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPomodoro, setIsPomodoro] = useState(isPomo)

  useEffect(() => {
    setIsTimerRunning(isRunning)
    let timer
    if (minutes === 0 && seconds === 0) {
      if (isPomodoro) {
        updateNumPomosComplete(numPomosComplete + 1)
      }
      onTimerFinish()
    }
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1)
          setSeconds(59)
        } else setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [
    isPomodoro,
    numPomos,
    isRunning,
    minutes,
    seconds,
    onTimerFinish,
    //numPomosComplete,
    //updateNumPomosComplete,
  ])
  useEffect(() => {
    if (isRunning) setTaskStatus('InProgress')
  }, [isRunning, setTaskStatus])
  //useEffect(() => {
  /*const startTimer = () => {
    let timer
    timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        if (isPomodoro) updateNumPomosComplete(numPomosComplete + 1)
        clearInterval(timer)
      }
      if (minutes > 0 || seconds > 0) {
        console.log(minutes + ':' + seconds)
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1)
          setSeconds(59)
        } else setSeconds((prevSeconds) => prevSeconds - 1)
      }
    }, 1000)
  }

  //}, [])*/

  //return () => clearInterval(timer)
  /*
      <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
        start
      </Button>
  */
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
    >
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
          {minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </Text>
        <Button
          onClick={() => {
            setIsRunning(true)
            //setTaskStatus('InProgress')
          }}
          disabled={isRunning}
          position="relative"
          //bottom="51.6%"
          bg="#6284FF"
          color="white"
          borderRadius="10px"
          mt="10%"
          //w="74.175"
          w="26.7%"
          //h="37.43px"
          h="21.5%"
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
  )
}

export default Timer
