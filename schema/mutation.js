const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLError,
} = require("graphql");
const jwt = require("jsonwebtoken");
const { books, users, getNextBookId } = require("../db");
const { JWT_SECRET, requireUser } = require("../middleware/auth");
const BookType = require("./types/book");

const MutationType = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    login: {
      type: GraphQLString,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const user = users.find(
          (user) =>
            user.password === args.password && user.username === args.username,
        );

        if (!user) {
          throw new GraphQLError("Invalid username or password!");
        }

        return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
          expiresIn: "1h",
        });
      },
    },
    createBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLInt },
      },
      resolve: (parent, args, context) => {
        requireUser(context);

        const newBook = {
          id: getNextBookId(),
          title: args.title,
          author: args.author,
          year: args.year,
        };
        books.push(newBook);
        return newBook;
      },
    },
  },
});

module.exports = MutationType;
