// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
// import { ApolloServer } from "apollo-server-micro";
// import { useServer } from "graphql-ws/lib/use/ws";
// import { createServer } from "http";
// import { NextApiRequest, NextApiResponse } from "next";
// import { WebSocketServer } from "ws";
// import { createContext } from "../../graphql/context";
// import Mutation from "../../graphql/resolvers/Mutation";
// import Query from "../../graphql/resolvers/Query";
// import { typeDefs } from "../../graphql/schema";
// import { PubSub } from "graphql-subscriptions";

// const httpServer = createServer();
// const wsServer = new WebSocketServer({
//   // This is the `httpServer` we created in a previous step.
//   server: httpServer,
//   // Pass a different path here if your ApolloServer serves at
//   // a different path.
//   path: "/graphql",
// });
// export const pubsub = new PubSub();

// pubsub.publish("POST_CREATED", {

// });

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription: {
//       postCreated: {
//         subscribe: () => { return pubsub.asyncIterator(["POST_CREATED"])},
//       },
//     },
//   },
// });

// // Hand in the schema we just created and have the
// // WebSocketServer start listening.
// const serverCleanup = useServer({ schema }, wsServer);
// const server = new ApolloServer({
//   context: createContext,
//   schema,
//   plugins: [
//     // Proper shutdown for the HTTP server.
//     ApolloServerPluginDrainHttpServer({ httpServer }),

//     // Proper shutdown for the WebSocket server.
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           },
//         };
//       },
//     },
//   ],
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// const startServer = server.start();

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

//   await server.createHandler({
//     path: "/api/graphql",
//   })(req, res);
// };
export {};
