import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";

// Below is a placeholder for the final version of the tasks datatype
const finalTasksData = [
  {
    "type": "Top Priority",
    "data": [
      {
        "id": 1,
        "title": "Complete Math Homework",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": true
      },
      {
        "id": 2,
        "title": "Assign Leader for Task 1",
        "status": "status",
        "notes": "",
        "pomodoros": 2,
        "open": false
      }
    ]
  },
  {
    "type": "Important",
    "data": []
  },
  {
    "type": "Other",
    "data": []
  }
]

const TaskBox = () => {
      const [tasksData, updateTasksData] = useState(finalTasksData)

      const onUpdate = (typeidx, data, saveworthy) => {
        // Receive callback from TaskType
        let tasksDataTemp = [...tasksData]
        tasksDataTemp[typeidx] = {'type': tasksData[typeidx].type, 'data': data}
        updateTasksData(tasksDataTemp)
        if (saveworthy) updateDatabase(tasksDataTemp)
      }

      const onDragEnd = (result) => {
        // Handle drop of card and swap them
        if (!result.destination) return
        let tasksDataTemp = [...tasksData]
        let taskItself = tasksDataTemp[result.source.droppableId].data[result.source.index]
        tasksDataTemp[result.source.droppableId].data.splice(result.source.index, 1)
        tasksDataTemp[result.destination.droppableId].data.splice(result.destination.index, 0, taskItself)
        updateTasksData(tasksDataTemp)
        updateDatabase(tasksDataTemp)
      }

      function updateDatabase(data) {
        console.log('A save-worthy modification just occurred!')
        console.log(data)
        // Could probably strip out the "open" property. Not really required for saving.
        // TODO: Update database
      }

      return (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            {tasksData.map(({type, data}, typeidx) => {
                return (
                    <TaskType type={type} typeidx={typeidx} data={data} callback={onUpdate} />
                )
            })}
          </DragDropContext>
        </>
    )
}

export default TaskBox
