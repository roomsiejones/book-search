// graphql
const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    _id:ID!,
    username:String,
    email:String,
    bookCount:INT,
    savedBooks:{Book},

}

type Book {
    bookID:ID!,
    authrors:[String],
    description:String,
    image:String,
    link:String,
    title:String!,

}

type Auth {
    token:ID!,
    user:USER,

}

input BookInput {
    authors:[String],
    description: String!,
    bookID:String!,
    image:String,
    link:String,
    title:String!,


}

type Query {
    me:User,
}

type Mutation {
    login(email:String!, email:String!): Auth,
    addUser(username:String!, email:String!, password:String!): Auth,
    saveBook(bookData:BookInput!): User,
    removeBook(bookData:BookInput!): User,
}
`;
module.exports = typeDefs;