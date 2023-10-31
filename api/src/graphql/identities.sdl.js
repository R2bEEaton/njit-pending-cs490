export const schema = gql`
  type Identity {
    id: Int!
    provider: String!
    uid: String!
    userId: Int!
    user: User!
    accessToken: String
    refreshToken: String
    refreshExpiry: DateTime
    scope: String
    lastLoginAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    identities: [Identity!]! @requireAuth
    identity(id: Int!): Identity @requireAuth
  }

  input CreateIdentityInput {
    provider: String!
    uid: String!
    userId: Int!
    accessToken: String
    refreshToken: String
    refreshExpiry: DateTime
    scope: String
    lastLoginAt: DateTime!
  }

  input UpdateIdentityInput {
    provider: String
    uid: String
    userId: Int
    accessToken: String
    refreshToken: String
    refreshExpiry: DateTime
    scope: String
    lastLoginAt: DateTime
  }

  type Mutation {
    createIdentity(input: CreateIdentityInput!): Identity! @requireAuth
    updateIdentity(id: Int!, input: UpdateIdentityInput!): Identity!
      @requireAuth
    deleteIdentity(id: Int!): Identity! @requireAuth
  }
`
