const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} = require("graphql");
const { books } = require("../db");
const { requireUser } = require("../middleware/auth");
const BookType = require("./types/book");
const UserType = require("./types/user");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    book: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, args) =>
        books.find((book) => book.id === Number(args.id)),
    },
    me: {
      type: UserType,
      resolve: (parent, args, context) => requireUser(context),
    },
  },
});

module.exports = QueryType;
