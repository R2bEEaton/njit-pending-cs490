import {Box, Flex, Text} from "@chakra-ui/react";
import TaskCard from "src/components/TaskCard/TaskCard";
import {Droppable, Draggable} from "react-beautiful-dnd"

const TaskType = ({type, typeidx, data, callback}) => {
  const onUpdate = (idx, task, saveworthy) => {
    data[idx] = task
    //console.log('typeidx', idx, typeidx, task, data)
    callback(typeidx, data, saveworthy)
  }

  return (
    <>
      <Box backgroundColor={'#F5F7F9'} w={'100%'} mb={'10px'} p={'16px'} borderRadius={'8px'}>
          <Text fontSize={'20px'}>{type}</Text>
          <Droppable droppableId={typeidx.toString()} type={"TASKCARD"}>
            {(provided) => (
              <Flex flexDirection={'column'} {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((task, idx) => {
                  return (
                    <>
                      <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                        {(provided) => (
                          <Box {...provided.draggableProps} ref={provided.innerRef} mt={'6px'} mb={'6px'}>
                            <TaskCard dragHandle={provided.dragHandleProps} task={task} idx={idx} callback={onUpdate} />
                          </Box>
                        )}
                      </Draggable>
                    </>
                  )
                })}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
      </Box>
    </>
  )
}

export default TaskType
