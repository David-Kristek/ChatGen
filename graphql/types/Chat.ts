import { extendType, list, nonNull, objectType, stringArg } from "@nexus/schema";
import ChatModel from "../../Models/Chat";
export const Chat = objectType({
  name: "chat",
  definition(t) {
    t.string("name"),
      t.string("image"),
      t.boolean("group"),
      t.field("members", {
        type: list("user"),
      });
  },
});

// export const PostMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.field("addChat", {
//       type: Chat,
//       args: {                                        
//         : nonNull(stringArg()),                 
//         body: nonNull(stringArg()),                  
//       },
//       resolve: async (_root, args, ctx) => {
//         const newChat = new ChatModel({
//             members: 
//         });
//         return; // ...
//       },
//     });
//   },
// });
