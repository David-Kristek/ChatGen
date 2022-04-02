// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withAuth } from "../../../lib/Auth";
import dbConnect from "../../../lib/MongoDB";
import { User as UserType } from "../../../Models/Types";
import User from "../../../Models/User";

export type ResponseData<Type> = Type | { error: any };

type Data =
  | {
      users: UserType[];
    }
  | { error: any };
type response = NextApiResponse<Data>;

export default async function handler(req: NextApiRequest, res: response) {
  switch (req.method) {
    case "GET":
      return await searchForUser(String(req.query.name), req, res);
    default:
      break;
  }
}
const searchForUser = async (
  user: string,
  req: NextApiRequest,
  res: response
) => {
  await dbConnect();
  const auth = await withAuth(req, res);
  if (auth?.red) return auth;

  try {
    const users = await User.find({
      $and: [
        { $text: { $search: user } },
        { email: { $ne: auth.user?.email } },
      ],
    }).limit(3);

    console.log(users);
    // users = users.filter(user => user.email !== auth.user?.email)
    return res.status(200).json({ users });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({ error });
  }
};
