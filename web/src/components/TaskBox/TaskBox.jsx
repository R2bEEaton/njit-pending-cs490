import TaskType from "src/components/TaskType/TaskType";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";
import {toast, Toaster} from "@redwoodjs/web/dist/toast";

const TaskBox = ({tasksData, updateTasksData}) => {
  // Easter egg stuff - dw about it
  const [dndEasterEgg, updateDndEasterEgg] = useState([]);

  const onUpdate = (typeidx, data) => {
    // Receive callback from TaskType
    let tasksDataTemp = {...tasksData}
    tasksDataTemp[typeidx] = data
    updateTasksData(tasksDataTemp)
  }

  const onDragEnd = (result) => {
    // Handle drop of card and swap them
    if (!result.destination || (result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index)) return
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
  }

  return (
    <>
      <Toaster/>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(tasksData).map((type, index) => {
          return (
            <TaskType key={index} type={type} data={tasksData[type]} callback={onUpdate}/>
          )
        })}
      </DragDropContext>
    </>
  )
}

export default TaskBox
