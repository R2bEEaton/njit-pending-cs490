export const schema = gql`
  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    pomodoro: Int!
    shortBreak: Int!
    longBreak: Int!
    picture: String!
    identities: [Identity]!
    tasks: [Task]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    picture: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    pomodoro: Int
    shortBreak: Int
    longBreak: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
