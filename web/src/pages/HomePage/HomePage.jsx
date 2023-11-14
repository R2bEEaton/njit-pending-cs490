import { useState, useEffect } from 'react'

import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Textarea,
} from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import TaskBox from 'src/components/TaskBox/TaskBox'
import DatePicker from "src/components/DatePicker/DatePicker";

const ToastWelcome = () => {
  // Use a state variable to track whether the toast notification has been shown
  const [showNotification, setShowNotification] = useState(false)

  // Check if it's the user's first visit to the homepage during this session
  useEffect(() => {
    const hasVisitedHomepage = sessionStorage.getItem('visitedHomepage')

    if (!hasVisitedHomepage) {
      // Show the toast notification
      toast.success("Welcome, let's Crush It!")

      // Update the flag to indicate that the notification has been shown
      sessionStorage.setItem('visitedHomepage', 'true')
      setShowNotification(true)
    }
  }, [])
}

let finalTasksData = {
  'Top Priority': [
    {
      id: 1,
      title: 'Complete Math Homework',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'Completed',
      pomodoros: 2,
      expanded: false,
    },
    {
      id: 0,
      title: 'Complete Math Homework',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'Cancelled',
      pomodoros: 3,
      expanded: false,
    },
  ],
  Important: [
    {
      id: 2,
      title: 'Complete Math Homework',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipisprevtacing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'InProgress',
      pomodoros: 4,
      expanded: false,
    },
  ],
  Other: [],
}

function FindID() {
  let idsArray = []
  Object.keys(finalTasksData).map((data) => {
    finalTasksData[data].map(({ id }) => {
      idsArray.push(id)
    })
  })
  idsArray.sort()
  let i = 0
  for (; i < idsArray.length; i++) {
    if (i !== idsArray[i]) break
  }
  console.log("New task's id should be: " + i)
  return i
}

const AddTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    id: FindID(),
    title: '',
    notes: '',
    pomodoros: 1,
    status: 'NotStarted',
    expanded: false,
  })
  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }))
  }

  const handleSubmit = () => {
    console.log('Form data submitted:', formData)
    //add new task to database
    //clear form data
    setFormData({
      id: FindID(),
      title: '',
      notes: '',
      pomodoros: 1,
      status: 'NotStarted',
      expanded: false,
    })
    onClose()
  }
  return (
    <>
      <IconButton
        isRound={true}
        w="39px"
        h="39px"
        variant="solid"
        colorScheme="blue"
        aria-label="add task"
        icon={<AddIcon color="white" h="16px" w="16px" />}
        ml=".5vw"
        mb=".5vw"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Pomodoro Timer</FormLabel>
              <NumberInput
                min={0}
                defaultValue={1}
                value={formData.pomodoros}
                onChange={(valueString) =>
                  handleChange('pomodoros', parseInt(valueString, 10))
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Task Notes</FormLabel>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mt={5} mr={3} colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button mt={5} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  ToastWelcome()
  const [date, setDate] = useState()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <DatePicker setDateProp={setDate} />
      <Flex fontFamily={'DM Sans'} gap={'5%'}>
          <Box w={"50%"}>
              <Text fontSize={'30px'} fontWeight={'700'}>Tasks</Text>
              <Box w={'100%'} p={'20px'} borderRadius={'10px'} boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}>
                  <TaskBox date={date} />
              </Box>
          </Box>
          <Box>
              <Text fontSize={'30px'} fontWeight={'700'}>Appointments</Text>
          </Box>
      </Flex>
    </>
  )
}

export default HomePage
