// this is taking the place of the user-controller.js
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) { const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Need to log-in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    //checks for an email
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {throw new AuthenticationError('Wrong log-in info');
      }
    //checks for correct password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password');
      }

      const token = signToken(user);
      return { token, user };
    },

    //allows a book to be saved serached
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }
      // gets rid of the book user wants to by id
      throw new AuthenticationError('User must be logged in to continue!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('User must be logged in to delete book!');
    },
  },
};

module.exports = resolvers;
