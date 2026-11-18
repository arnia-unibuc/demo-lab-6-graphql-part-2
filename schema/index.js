const { GraphQLSchema } = require("graphql");
const QueryType = require("./query");
const MutationType = require("./mutation");

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
