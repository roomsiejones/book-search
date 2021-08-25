const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
// add these folders and files below.
const {typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth.js');


const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: authMiddleware,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// needs to be a get route
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
