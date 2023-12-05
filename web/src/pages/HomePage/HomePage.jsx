import {useState, useEffect} from 'react'

import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'

import {MetaTags, useMutation} from '@redwoodjs/web'
import {toast} from '@redwoodjs/web/toast'

import {useAuth} from 'src/auth'
import TaskBox from 'src/components/TaskBox/TaskBox'
import DatePicker from "src/components/DatePicker/DatePicker";
import {handleDatabase} from "src/pages/HomePage/handleDatabase";
import {useApolloClient} from "@apollo/client";
import AddTaskModal from "src/components/AddTaskModal/AddTaskModal";
import AppointmentsBox from "src/components/AppointmentsBox/AppointmentsBox";

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

  const [appts, setAppts] = useState([])

  useEffect(() => {
    if (!tasks || tasks === EMPTY_TASKS_DATA) return
    console.log('Tasks Update Triggered, saving to database')

    const updatedTaskData = {
      // Replace with the fields you want to update and their new values
      taskList: tasks,
    };
    const convertedDate = new Date(date);
    const formattedDate = convertedDate.toISOString();
    console.log(formattedDate)
    update({variables: {userId: currentUser.id, date: formattedDate, input: updatedTaskData}}).then().catch(() => {
      const convertedDate = new Date(date);
      const formattedDate = convertedDate.toISOString();
      const inputTask = {
        date: formattedDate,
        taskList: tasks,
        userId: currentUser.id,
      };
      create({variables: {input: inputTask}})
    })
  }, [tasks])

  const client = useApolloClient()

  /**
   * When the date changes, refresh the tasks list
   */
  useEffect(() => {
    if (!date) return

    // console.log(`The date changed to ${date} so we need to grab data`)

    async function get_cal_data() {
      const response = await fetch(`http://localhost:8910/.redwood/functions/todaysCalendar?userId=${currentUser.id}&startDate=${date}`); // Assuming your API endpoint is /api/data
      const data = await response.json();
      console.log(data.events)
    }
    get_cal_data()

    handleDatabase({userId: currentUser?.id, date: date, client}).then((res) => {
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
    <Flex fontFamily={'DM Sans'} gap={'16px'} mt={'20px'}>
      <Box w={"55%"}>
        <Text fontSize={'30px'} fontWeight={'700'}>
          Tasks
          <AddTaskModal tasks={tasks} setTasks={setTasks} />
        </Text>
        <Box w={'100%'} p={'20px'} borderRadius={'10px'} boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}
             mt={'15px'}>
          <TaskBox tasksData={tasks} updateTasksData={setTasks} />
        </Box>
      </Box>
      <Box w={"45%"}>
        <Text fontSize={'30px'} fontWeight={'700'}>Appointments</Text>
        <Box w={'100%'} p={'20px'} borderRadius={'10px'} boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.10);'}
             mt={'15px'}>
          <AppointmentsBox appointmentsJSON={appts}/>
        </Box>
      </Box>
    </Flex>
  </>)
}

export default HomePage
