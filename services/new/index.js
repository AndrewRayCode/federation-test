const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type Empty {
    id: ID
  }
  extend type Member @key(fields: "id") {
    id: ID! @external
    name: String
  }
`;

const resolvers = {
  Member: {
    name() {
      return 'New name';
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4004 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
