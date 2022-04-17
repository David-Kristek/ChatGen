import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiResponse, NextApiRequest, PageConfig } from "next";
import { createContext } from "../../graphql/context";
import Query from "../../graphql/resolvers/Query";
import Mutation from "../../graphql/resolvers/Mutation";
import { typeDefs } from "../../graphql/schema";
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';



const httpServer = createServer(); 

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  context: createContext,
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// const startServer = apolloServer.start();

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://studio.apollographql.com"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   if (req.method === "OPTIONS") {
//     res.end();
//     return false;
//   }
//   await startServer;

//   await apolloServer.createHandler({
//     path: "/api/graphql",
//   })(req, res);
// };

// // // Apollo Server Micro takes care of body parsing
// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// };
