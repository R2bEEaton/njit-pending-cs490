import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import {useMutation} from '@redwoodjs/web'
import { useAuth } from "src/auth";
import {useEffect, useState} from "react";
import {toast, Toaster} from "@redwoodjs/web/dist/toast";

// Below is a placeholder for the final version of the tasks datatype
const finalTasksData = {
  "Top Priority": [
    {
      "id": 3,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 2,
      "expanded": false
    },
    {
      "id": 0,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 3,
      "expanded": false
    }
  ],
  "Important": [
    {
      "id": 2,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 4,
      "expanded": false
    },
  ],
  "Other": []
}
const UPDATE_TASKS = gql`
  mutation UpdateTasksMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`

const TaskBox = () => {
      const { currentUser, reauthenticate } = useAuth()
      const [tasksData, updateTasksData] = useState(finalTasksData)
      const [create, { loading, error }] = useMutation(
        UPDATE_TASKS,
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

      // When the tasks change, compute the ID value of a new card if it were to be added
      useEffect(() => {
        // The ID of a new task
        let idsArray = []
        Object.keys(tasksData).map((data) => {
          tasksData[data].map(({id}) => {
            idsArray.push(id)
          })
        })
        idsArray.sort()
        let i = 0
        for (; i < idsArray.length; i++) {
          if (i !== idsArray[i]) break;
        }
        console.log("New task's id should be: " + i);
      }, [tasksData])
      

      function updateDatabase(data) {
        const theData = {
          date: new Date().toISOString(), // Current date
          taskList: data, // Your JSON task list
          userId: currentUser.id, // Replace with the actual user ID
        };
        console.log('A save-worthy modification just occurred!')
        console.log(JSON.stringify(data))
        console.log(theData)
        create({variables: {id: 1, input: theData}})
        // TODO: Update database
      }

      return (
        <>
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
