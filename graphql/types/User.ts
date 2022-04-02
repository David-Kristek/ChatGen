import { extendType, list, objectType } from "@nexus/schema";
import UserModel from "../../Models/User";

export const User = objectType({
  name: "user",
  definition(t) {
    t.id("_id");
    t.string("name"),
      t.string("email"),
      t.string("image"),
      t.boolean("emailVerified"),
      t.field("friends", {
        type: list(User),
      });
  },
});
// export const users = extendType({
//   type: "Query",
//   definition(t) {
//     t.field("users", {
//       type: list(User),
//       resolve: async () => {
//         const users = await UserModel.find();
//         return users;
//       },
//     });
//   },
// });
