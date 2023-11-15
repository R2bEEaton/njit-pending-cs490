import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import { useMutation } from '@redwoodjs/web'
import { useAuth } from "src/auth";
import {useEffect, useState} from "react";
import {toast, Toaster} from "@redwoodjs/web/dist/toast";
import { useLazyQuery } from '@apollo/client';

// Below is a placeholder for the final version of the tasks datatype

const finalTasksData = {
  "Top Priority": [
    {
      "id": 3,
      "title": "Task 1",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 2,
      "expanded": false
    },
    {
      "id": 0,
      "title": "Task 2",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 3,
      "expanded": false
    }
  ],
  "Important": [
    {
      "id": 2,
      "title": "Task 3",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 4,
      "expanded": false
    },
  ],
  "Other": []
}

const finalTasksData2 = {
  "Top Priority": [],
  "Important": [],
  "Other": []
}

const UPDATE_TASKS = gql`
  mutation UpdateTasksMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`
const GET_TASKS = gql`
  query GetTasks($userId: Int!, $date: DateTime!) {
    tasksByUserIdAndDate(userId: $userId, date: $date) {
      id
      date
      taskList
      userId
    }
  }
`;
const CREATE_TASKS = gql`
  mutation CreateTasksMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`



const TaskBox = ({ date}) => {
      const { currentUser, reauthenticate } = useAuth()
      const [tasksData, updateTasksData] = useState(finalTasksData)
      const [fetchTasks, {data, loading, error }] = useLazyQuery(GET_TASKS);
      const [update] = useMutation(
        UPDATE_TASKS,
        { onCompleted: reauthenticate }
      )
      const [create] = useMutation(
        CREATE_TASKS,
        { onCompleted: reauthenticate }
      )

      // Easter egg stuff - dw about it
      const [dndEasterEgg, updateDndEasterEgg] = useState([]);

      const onUpdate = (typeidx, data, saveworthy) => {
        // Receive callback from TaskType
        let tasksDataTemp = {...tasksData}
        tasksDataTemp[typeidx] = data
        updateTasksData(tasksDataTemp)
        if (saveworthy) updateDatabase(tasksDataTemp)
      }


      const onDragEnd = (result) => {
        // Handle drop of card and swap them
        if (!result.destination) return
        console.log(result)
        let tasksDataTemp = {...tasksData}
        let taskItself = tasksDataTemp[result.source.droppableId][result.source.index]

        // Easter egg shhh
        let dndEasterEggTemp = [...dndEasterEgg]
        let swappedIds = [tasksDataTemp[result.source.droppableId][result.source.index]?.id,
          tasksDataTemp[result.destination.droppableId][result.destination.index]?.id].sort()
        if (dndEasterEggTemp[dndEasterEggTemp.length - 1] !== JSON.stringify(swappedIds)) dndEasterEggTemp = [];
        dndEasterEggTemp.push(JSON.stringify(swappedIds))
        updateDndEasterEgg(dndEasterEggTemp)
        if (dndEasterEggTemp.length % 3 === 0) toast.loading(`Ind${''.padStart(dndEasterEggTemp.length / 3, 'e')}cisive..?`, {duration: 5000})
        // End of easter egg shhh

        // Remove task from source list and add to destination list
        tasksDataTemp[result.source.droppableId].splice(result.source.index, 1)
        tasksDataTemp[result.destination.droppableId].splice(result.destination.index, 0, taskItself)

        updateTasksData(tasksDataTemp)
        updateDatabase(tasksDataTemp)
      }

      useEffect(() => {
        console.log(date + "T00:00:00.000Z")
        try {
          fetchTasks({
            variables: {userId: currentUser.id, date: new Date(date)},
          }).then((result) => {
            const data = result.data;
            const taskLists = data.tasksByUserIdAndDate.map((task) => task.taskList);
            let dataTemp = {...taskLists[0]}
            console.log(dataTemp)
          });
        } catch (error) {}

        //const taskLists = result.data.tasksByUserIdAndDate.map((task) => task.taskList);
        //console.log('Task Lists:', taskLists);
        //let dataTemp = {...taskLists[0]}
        //console.log(dataTemp)
          //updateTasksData(dataTemp)
          //console.log('Fetched Tasks:', data.tasksByUserIdAndDate);

      }, [date]);

      function updateDatabase(data) {
        const theData = {
          date: date, // Current date
          taskList: data, // Your JSON task list
          userId: currentUser?.id, // Replace with the actual user ID
        };
        console.log('A save-worthy modification just occurred!')

        console.log(JSON.stringify(data))
        //console.log(theData)

        update({variables: {id: 1, input: theData}})
        //create({variables: {input: theData}})

        // TODO: Update database
      }

      return (
        <>
          <h1>{date}</h1>
          <Toaster />
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(tasksData).map((type, index) => {
              return (
                <TaskType key={index} type={type} data={tasksData[type]} callback={onUpdate} />
              )
            })}
          </DragDropContext>
        </>
    )
}

export default TaskBox
