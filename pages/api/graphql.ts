import { createServer, createPubSub, PubSub } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dbConnect from "../../lib/MongoDB";
import "event-target-polyfill";
import Mutation from "../../graphql/resolvers/Mutation";
import Query from "../../graphql/resolvers/Query";
import { typeDefs } from "../../graphql/schema";
import Subscription from "../../graphql/resolvers/Subscription";
import { Chat, Message, User } from "../../graphql/generated/schema";

const pubSub = createPubSub<{
  "user:newMessage": [userId: string, message: Message];
  "user:newChat": [userId: string, chat: Chat];
}>();

export type pubSub = typeof pubSub;

const server = createServer<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  {
    user: User;
    pubSub: any;
  }           
>({
  context: async ({ req }) => {
    const session = await getSession({ req });
    await dbConnect();
    return {
      user: { ...session?.user, _id: session?.userId } as User,
      pubSub,
    };
  },
  schema: {
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  },
});

export default server;
