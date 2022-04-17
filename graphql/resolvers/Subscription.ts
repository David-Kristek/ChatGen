import { pubSub } from "../../pages/api/graphql";
import { User } from "../generated/schema";

export default {
  newMessage: {
    subscribe: (_a, _b, { pubSub, user }: { pubSub: pubSub; user: User }) =>
      pubSub.subscribe("user:newMessage", user._id),
      resolve: (payload) => payload,
  },
  newChat: {
    subscribe: (_a, _b, { pubSub, user }: { pubSub: pubSub; user: User }) =>
      pubSub.subscribe("user:newChat", user._id),
    resolve: (payload) => payload,
  },
};
