const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
    summary: {
      type: GraphQLString,
      resolve: (parent) => `${parent.title} by ${parent.author}`,
    },
  },
});

module.exports = BookType;
