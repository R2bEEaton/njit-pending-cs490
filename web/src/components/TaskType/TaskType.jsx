import { Box, Flex, Text } from '@chakra-ui/react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import TaskCard from 'src/components/TaskCard/TaskCard'

const TaskType = ({ type, data, callback }) => {
  const onUpdate = (idx, task, saveworthy) => {
    // Receive callback from TaskCard and send along to TaskBox
    data[idx] = task
    callback(type, data, saveworthy)
  }

  const onDragOver = () => {
    console.log('YOoo')
  }

  return (
    <>
      <Box
        backgroundColor={'#F5F7F9'}
        w={'100%'}
        mb={'10px'}
        p={'16px'}
        borderRadius={'8px'}
      >
        <Text fontSize={'20px'}>{type}</Text>
        <Droppable droppableId={type} onDragEnter={onDragOver}>
          {(provided) => (
            <>
              <Flex
                flexDirection={'column'}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.map((task, idx) => {
                  return (
                    <>
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={idx}
                      >
                        {(provided) => (
                          <Box
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            mt={'6px'}
                            mb={'6px'}
                          >
                            <TaskCard
                              dragHandle={provided.dragHandleProps}
                              task={task}
                              idx={idx}
                              callback={onUpdate}
                            />
                          </Box>
                        )}
                      </Draggable>
                    </>
                  )
                })}
                {provided.placeholder}
                {!data.length ? (
                  <Text
                    fontStyle={'italic'}
                    fontWeight={'normal'}
                    fontSize={'12px'}
                  >
                    Your {type} tasks.
                  </Text>
                ) : (
                  ''
                )}
              </Flex>
            </>
          )}
        </Droppable>
      </Box>
    </>
  )
}

export default TaskType
