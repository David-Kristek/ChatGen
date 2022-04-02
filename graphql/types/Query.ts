import { async } from "@firebase/util";
import { list, queryType, stringArg } from "@nexus/schema";
import UserModel from "../../Models/User";
import { User } from "./";
export const Query = queryType({
  definition(t) {
    t.field("searchForUser", {
      type: list(User),
      args: { queryString: stringArg() },
      resolve: async (root, { queryString }, ctx) => {

        const users = await UserModel.find({
          $and: [
            { $text: { $search: String(queryString) } },
            { email: { $ne: String(ctx?.user?.email) } },
          ],
        }).limit(3);
        return users;
      },
    });
  },
});
