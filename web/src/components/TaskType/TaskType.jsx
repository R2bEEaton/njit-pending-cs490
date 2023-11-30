import {Box, Flex, Text} from "@chakra-ui/react";
import TaskCard from "src/components/TaskCard/TaskCard";
import {Droppable, Draggable} from "react-beautiful-dnd"

const TaskType = ({type, data, callback}) => {
    /**
     * Send data back to the parent after updating the current task
     * @param idx
     * @param task
     */
    const onUpdate = (idx, task) => {
        // Receive callback from TaskCard and send along to TaskBox
        data[idx] = task
        callback(type, data)
    }

    if (!type) throw new Error('type is required')
    if (!data) throw new Error('data is required')
    if (!callback) throw new Error('callback is required')

    return (
        <>
            <Box backgroundColor={'#F5F7F9'} w={'100%'} mb={'10px'} p={'16px'} borderRadius={'8px'}>
                <Text fontSize={'20px'}>{type}</Text>
                <Droppable droppableId={type}>
                    {(provided) => (
                        <Flex flexDirection={'column'} {...provided.droppableProps} ref={provided.innerRef}>
                            {data.map((task, idx) => {
                                return (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                                        {(provided, snapshot) => (
                                            <Box {...provided.draggableProps} ref={provided.innerRef} mt={'6px'}
                                                 mb={'6px'}>
                                                <TaskCard dragHandle={provided.dragHandleProps} task={task} idx={idx}
                                                          callback={onUpdate} isDragging={snapshot.isDragging}/>
                                            </Box>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            {(!data.length) ? (<Text fontStyle={'italic'} fontWeight={'normal'}
                                                     fontSize={'12px'}>Your {type} tasks.</Text>) : ''}
                        </Flex>
                    )}
                </Droppable>
            </Box>
        </>
    )
}

export default TaskType