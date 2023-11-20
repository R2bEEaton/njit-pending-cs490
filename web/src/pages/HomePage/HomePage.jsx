import {useState, useEffect} from 'react'

import {AddIcon} from '@chakra-ui/icons'
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

import {MetaTags, useMutation} from '@redwoodjs/web'
import {toast} from '@redwoodjs/web/toast'

import {useAuth} from 'src/auth'
import TaskBox from 'src/components/TaskBox/TaskBox'
import DatePicker from "src/components/DatePicker/DatePicker";
import {handleDatabase} from "src/pages/HomePage/handleDatabase";
import { useApolloClient } from "@apollo/client";

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



const EMPTY_TASKS_DATA = {"Top Priority": [], "Important": [], "Other": []}
/*
const UPDATE_TASKS = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`
*/

const UPDATE_TASKS = gql`
  mutation UpdateTaskwDateMutation($userId: Int!, $date: DateTime!, $input: UpdateTaskwDateInput!) {
    updateTaskwDate(userId: $userId, date: $date, input: $input) {
      date
    }
  }
`;
const CREATE_TASKS = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      date
    }
  }
`;

const HomePage = () => {
  const [update] = useMutation(UPDATE_TASKS)
  const [create] = useMutation(CREATE_TASKS)
  const {currentUser} = useAuth()
  ToastWelcome()
  const [date, setDate] = useState()
  const [tasks, setTasks] = useState(EMPTY_TASKS_DATA)
  function FindID() {
    let idsArray = []
    Object.keys(tasks).map((data) => {
      tasks[data].map(({id}) => {
        idsArray.push(id)
      })
    })
    idsArray.sort()
    let i = 0
    for (; i < idsArray.length; i++) {
      if (i !== idsArray[i]) break
    }
    return i
  }
 
 const AddTask = () => {
   const {isOpen, onOpen, onClose} = useDisclosure()
   const [formData, setFormData] = useState({
     id: 1 /*FindID()*/, title: '', notes: '', pomodoros: 1, status: 'NotStarted', expanded: false,
   })
   const handleChange = (field, value) => {
     setFormData((prevData) => ({...prevData, [field]: value}))
   }
 
   const handleSubmit = () => {
     console.log('Form data submitted:', formData)
     //add new task to database
     //clear form data
     const category = 'Important'; // Adjust the category as needed
     const newTask = {
       id: FindID(), // Use FindID() if needed
       title: formData.title,
       notes: formData.notes,
       pomodoros: formData.pomodoros,
       status: formData.status,
       expanded: formData.expanded,
     };

     setTasks((prevTasks) => ({
       ...prevTasks,
       [category]: [...prevTasks[category], newTask],
     }));



     setFormData({
       id: FindID(), title: '', notes: '', pomodoros: 1, status: 'NotStarted', expanded: false,
     })
     
     onClose()
   }
   return (<>
       <IconButton
         isRound={true}
         w="39px"
         h="39px"
         variant="solid"
         colorScheme="blue"
         aria-label="add task"
         icon={<AddIcon color="white" h="16px" w="16px"/>}
         ml=".5vw"
         mb=".5vw"
         onClick={onOpen}
       />
       <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay/>
         <ModalContent>
           <ModalHeader>Create New task</ModalHeader>
           <ModalCloseButton/>
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
                 onChange={(valueString) => handleChange('pomodoros', parseInt(valueString, 10))}
               >
                 <NumberInputField/>
                 <NumberInputStepper>
                   <NumberIncrementStepper/>
                   <NumberDecrementStepper/>
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
     </>)
 }

  /**
   * When the tasks state changes, save to the database
   * TODO: Re-add the database save functionality
   */

  useEffect(() => {
    if (!tasks || tasks == EMPTY_TASKS_DATA) return
    console.log('Tasks Update Triggered, saving to database')
    console.log("yo", tasks)
    const updatedTaskData = {
      // Replace with the fields you want to update and their new values
      taskList: tasks,
    };
    const convertedDate = new Date(date);
    const formattedDate = convertedDate.toISOString();
    console.log(formattedDate)
    update({variables: {userId: currentUser.id, date: formattedDate, input: updatedTaskData}})
    
    

    
    /*
    updateDatabase({userId: currentUser.id, input: updatedTaskData, client}).then((res) => {
      console.log(res)
    })
    */
    
    

    /**
     * TODO: Create function in handleDatabase.js to handle create / udpate
     */
  }, [tasks])

  const client = useApolloClient()
  
  /**
   * When the date changes, refresh the tasks list
   */
  useEffect(() => {
    if (!date) return

    console.log(`The date changed to ${date} so we need to grab data`)

    handleDatabase({userId: currentUser.id, date: date, client}).then((res) => {
      let orderedData = JSON.parse(JSON.stringify(res.taskList))
      const orderedKeys = ["Top Priority", "Important", "Other"];

      // Create a new object with the desired order
      const orderedTasks = {};
      orderedKeys.forEach((key) => {
        orderedTasks[key] = orderedData[key] || [];
      });

      setTasks(orderedTasks);
    }).catch(() => {
      const convertedDate = new Date(date);
      const formattedDate = convertedDate.toISOString();
      const inputTask = {
        date: formattedDate,
        taskList: EMPTY_TASKS_DATA,
        userId: currentUser.id,
      };
      create({variables: {input: inputTask}})
      setTasks(EMPTY_TASKS_DATA)
    })
  }, [date])

  return (<>
      <MetaTags title="Home" description="Home page"/>
      <DatePicker setDateProp={setDate}/>
      <Flex fontFamily={'DM Sans'} gap={'5%'} mt={'20px'}>
        <Box w={"50%"} mt={'20px'}>
          <Text fontSize={'30px'} fontWeight={'700'}>
            Tasks
            <AddTask/>
          </Text>
          <Box w={'100%'} p={'20px'} borderRadius={'10px'} boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}
               mt={'20px'}>
            <TaskBox tasksData={tasks} updateTasksData={setTasks}/>
          </Box>
        </Box>
        <Box>
          <Text fontSize={'30px'} fontWeight={'700'}>Appointments</Text>
        </Box>
      </Flex>
    </>)
}

export default HomePage
