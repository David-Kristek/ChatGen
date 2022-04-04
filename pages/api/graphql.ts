import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiResponse, NextApiRequest, PageConfig } from "next";
import { createContext } from "../../graphql/context";
import Query from "../../graphql/resolvers/Query";
import Mutation from "../../graphql/resolvers/Mutation";
import { typeDefs } from "../../graphql/schema";

const apolloServer = new ApolloServer({
  context: createContext,
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
});
const startServer = apolloServer.start();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
