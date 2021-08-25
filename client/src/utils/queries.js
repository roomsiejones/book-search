
// this with the mutations.js replaces the API util 
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id, username, email,
      savedBooks {
        bookId,
        authors,
        image,
        description,
        title,
        link,
      }
    }
  }
`;
