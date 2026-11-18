const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = UserType;
