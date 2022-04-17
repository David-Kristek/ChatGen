import { createServer, createPubSub, PubSub } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dbConnect from "../../lib/MongoDB";
import "event-target-polyfill";

const pubSub = createPubSub<{
  randomNumber: [randomNumber: number];
}>();
export var SubscribedUsers: [{ chatId: string; userId: string }];
const server = createServer<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  {
    session: Session | null;
    pubSub: any;
  }
>({
  context: async ({ req }) => {
    await dbConnect();
    return {
      session: await getSession({ req }),
      pubSub,
    };
  },
  schema: {
    typeDefs: /* GraphQL */ `
      type User {
        id: String!
        name: String!
        email: String!
        image: String!
      }
      type number {
        num: Float
      }
      type Subscription {
        globalCounter: Float
        countdown(from: Int!): Int!
      }
      type Mutation {
        broadcastRandomNumber: Boolean
      }
      type Query {
        session: User
      }
    `,
    resolvers: {
      Query: {
        session(_source, _args, context) {
          return context.session ?? null;
        },
      },
      Subscription: {
        globalCounter: {
          // subscribe to the randomNumber event
          subscribe: () => pubSub.subscribe("randomNumber"),

          resolve: (payload) => payload,
        },
        countdown: {
          // This will return the value on every 1 sec until it reaches 0
          subscribe: async function* (_, { from }) {
            for (let i = from; i >= 0; i--) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              yield { countdown: i };
            }
          },
        },
      },
      Mutation: {
        broadcastRandomNumber: (_, args) => {
          // publish a random number
          pubSub.publish("randomNumber", Math.random());
        },
      },
    },
    
  },
});

export default server;
