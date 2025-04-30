export const typeDefs = `
  type Query {
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
    bookCount: Int!
    }

  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Auth {
    token: ID!
    user: User
  }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input BookInput {
        bookId: ID!
        authors: [String]!
        description: String!
        title: String!
        image: String!
        link: String!
    }
`;

export default typeDefs;