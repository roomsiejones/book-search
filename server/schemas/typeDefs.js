// graphql  this is negating the needs of the api routes.

const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    _id:ID!
    username:String
    email:String
    password:String
    bookCount:Int
    savedBooks:[Book]

}

type Book {
    bookID:ID!
    authors:[String]
    description:String
    image:String
    link:String
    title:String!

}

type Auth {
    token:ID!
    user:User

}

input BookInput {
    authors:[String]
    description: String!
    bookID:String!
    image:String
    link:String
    title:String!

}

type Query {
    me:User
}

type Mutation {
    login(email:String!, email:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook(bookData:BookInput!): User
    removeBook(bookId:ID!): User
}
`;
module.exports = typeDefs;