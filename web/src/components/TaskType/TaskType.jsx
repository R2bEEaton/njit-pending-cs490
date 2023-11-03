import {Box, Flex, Text} from "@chakra-ui/react";
import TaskCard from "src/components/TaskCard/TaskCard";

const TaskType = ({type, data}) => {
  return (
    <Box backgroundColor={'#F5F7F9'} w={'100%'} mb={'10px'} p={'16px'} borderRadius={'8px'}>
        <Text fontSize={'20px'}>{type}</Text>
        <Flex flexDirection={'column'} gap={'12px'}>
        {data.map((task) => {
            return (
                <TaskCard task={task} />
            )
        })}
        </Flex>
    </Box>
  )
}

export default TaskType
