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
        "title": "Complete Math Homework 9",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 2,
        "title": "Complete Math Homework 10",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 3,
        "title": "Complete Math Homework 11",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 4,
        "title": "Complete Math Homework 12",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      }
    ]
  },
  {
    "type": "Important",
    "data": [
      {
        "id": 5,
        "title": "Complete Math Homework 9",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 6,
        "title": "Complete Math Homework 11",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 7,
        "title": "Complete Math Homework 12",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      }
    ]
  },
  {
    "type": "Other",
    "data": [
      {
        "id": 8,
        "title": "Complete Math Homework 9",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 9,
        "title": "Complete Math Homework 10",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 10,
        "title": "Complete Math Homework 11",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      },
      {
        "id": 11,
        "title": "Complete Math Homework 12",
        "status": "status",
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "pomodoros": 2,
        "open": false
      }
    ]
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
          {tasksData.map(({type, data}, typeidx) => {
              return (
                <DragDropContext onDragEnd={onDragEnd}>
                  <TaskType type={type} typeidx={typeidx} data={data} callback={onUpdate} />
                </DragDropContext>
              )
          })}
        </>
    )
}

export default TaskBox
