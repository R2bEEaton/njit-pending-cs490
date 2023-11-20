const GET_TASKS = gql`
  query GetTask($userId: Int!, $date: DateTime!) {
    tasksByUserIdAndDate(userId: $userId, date: $date) {
      id
      date
      taskList
      userId
    }
  }
`;
/*
const UPDATE_TASKS = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`
*/

export const handleDatabase = async ({userId, date, client}) => {
  const res = await client.query({query: GET_TASKS, variables: {userId, date: new Date(date).toISOString()}})
  return res?.data?.tasksByUserIdAndDate
}
/*
export const updateDatabase = async ({userId, input, client}) => {
  try {
    const res = await client.mutate({mutation: UPDATE_TASKS, variables: {userId, input}})
    return res?.data?.updateTask;
  }catch (error) {
    console.error("Error updating task:", error);
    throw error;
  } 
}  
*/
export default {handleDatabase}
