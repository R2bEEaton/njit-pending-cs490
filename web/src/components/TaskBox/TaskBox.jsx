import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import {useEffect, useState} from "react";

// Below is a placeholder for the final version of the tasks datatype
const finalTasksData = {
  "Top Priority": [
    {
      "id": 3,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 2,
      "expanded": true
    },
    {
      "id": 0,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 3,
      "expanded": true
    }
  ],
  "Important": [
    {
      "id": 2,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 4,
      "expanded": true
    },
  ],
  "Other": []
}

const TaskBox = () => {
      const [tasksData, updateTasksData] = useState(finalTasksData)

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
        console.log('A save-worthy modification just occurred!')
        console.log(JSON.stringify(data))
        // Could probably strip out the "open" property. Not really required for saving.
        // TODO: Update database
      }

      return (
        <>
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
