export const schema = gql`
  type Task {
    id: Int!
    date: DateTime!
    taskList: JSON!
    user: User!
    userId: Int!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    date: DateTime!
    taskList: JSON!
    userId: Int!
  }

  input UpdateTaskInput {
    date: DateTime
    taskList: JSON
    userId: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
