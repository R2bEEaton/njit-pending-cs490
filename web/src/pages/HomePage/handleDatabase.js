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

const handleDatabase = async ({userId, date, client}) => {
  const res = await client.query({query: GET_TASKS, variables: {userId, date: new Date(date).toISOString()}})
  return res?.data?.tasksByUserIdAndDate
}

export default handleDatabase
