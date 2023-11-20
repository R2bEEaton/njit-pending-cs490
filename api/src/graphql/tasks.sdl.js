/*
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
    tasksByUserIdAndDate(userId: Int!, date: DateTime!): Task @requireAuth
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

  input UpdateTaskwDateInput {
    date: DateTime
    taskList: JSON
    userId: Int
  }
  

  type Mutation {
    updateTaskwDate(userId: Int!, date: DateTime!, input: UpdateTaskwDateInput!): Task! @requireAuth
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
*/
export const schema = gql`
  type Task {
    id: Int!
    date: DateTime!
    taskList: JSON!
    user: User!
    userId: Int!
  }

  type Query {
    tasks: [Task!]! @skipAuth
    task(id: Int!): Task @skipAuth
    tasksByUserIdAndDate(userId: Int!, date: DateTime!): Task @skipAuth
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

  input UpdateTaskwDateInput {
    date: DateTime
    taskList: JSON
    userId: Int
  }
  

  type Mutation {
    updateTaskwDate(userId: Int!, date: DateTime!, input: UpdateTaskwDateInput!): Task! @skipAuth
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @skipAuth
    deleteTask(id: Int!): Task! @skipAuth
  }
`