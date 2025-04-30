import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      bookCount
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser ($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
      username
      email
      bookCount
    }
  }
}
`;

export const ADD_BOOK = gql`
mutation addBook ($input: BookInput!) {
  addBook(input: $input) {
    bookId
    authors
    description
    title
    image
    link
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
    bookCount
  }
}
`;
