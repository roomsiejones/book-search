import { gql } from '@apollo/client';

// this allows us to use the LOGIN_USER mutation in graphql
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id, username
      }
    }
  }
`;

// this allows us to use the ADD_USER mutation in graphql
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id, username
      }
    }
  }
`;

// this allows us to use the SAVE_BOOK mutation in graphql
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id, username, email, 
      savedBooks {
        bookId, authors, image, description, title, link
      }
    }
  }
`;

// this allows us to use the REMOVE_BOOK mutation in graphql

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id, username, email,
      savedBooks {
        bookId, authors, image, description, title, link
      }
    }
  }
`;
