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

const AddTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    timerAmount: 0,
  })
  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }))
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form data submitted:', formData)
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
                value={formData.timerAmount}
                onChange={(valueString) =>
                  handleChange('timerAmount', parseInt(valueString, 10))
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
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
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
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.jsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>

      {isAuthenticated ? (
        <p>{currentUser ? currentUser.email : ''}</p>
      ) : (
        <p>nothing to see here</p>
      )}

      <Flex fontFamily={'DM Sans'} gap={'5%'}>
        <Box w={'50%'}>
          <Text fontSize={'30px'} fontWeight={'700'}>
            Tasks
            <AddTask />
          </Text>

          <Box
            w={'100%'}
            p={'20px'}
            borderRadius={'10px'}
            boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}
          >
            <TaskBox />
          </Box>
        </Box>
        <Box>
          <Text fontSize={'30px'} fontWeight={'700'}>
            Appointments
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default HomePage
