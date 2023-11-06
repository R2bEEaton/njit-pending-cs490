import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";

// Below is a placeholder for the final version of the tasks datatype
const finalTasksData = {
  "Top Priority": [
    {
      "position": 1,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 2,
      "expanded": true
    },
    {
      "position": 2,
      "title": "Complete Math Homework",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "status": "NotStarted",
      "pomodoros": 2,
      "expanded": true
    }
  ],
  "Important": [],
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
        tasksDataTemp[result.source.droppableId].splice(result.source.index, 1)
        tasksDataTemp[result.destination.droppableId].splice(result.destination.index, 0, taskItself)
        updateTasksData(tasksDataTemp)
        updateDatabase(tasksDataTemp)
      }

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
