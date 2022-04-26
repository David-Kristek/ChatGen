import { context, pubSub } from "../../pages/api/graphql";
import { User } from "../generated/schema";

export default {
  newMessage: {
    subscribe: (_a, _b, { pubSub, user }: context) =>
      pubSub.subscribe("user:newMessage", user._id),
    resolve: (payload) => payload,
  },
  newChat: {
    subscribe: (_a, _b, { pubSub, user }: context) =>
      pubSub.subscribe("user:newChat", user._id),
    resolve: (payload) => payload,
  },
  nowActiveInChat: {
    subscribe: (_a, { chatId }, { pubSub, user }: context) =>
      pubSub.subscribe("chat:memberActive", chatId),
    resolve: (payload) => payload,
  },
  isUserTyping: {
    subscribe: (_, { chatId }, { pubSub, user }: context) =>
      pubSub.subscribe("chat:userTyping", chatId),
    resolve: (payload) => payload,
  },
};
