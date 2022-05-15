// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/MongoDB";
import Chat from "../../../Models/Chat";
import User from "../../../Models/User";
// import { User as UserType } from "../../../Models/_Types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  await User.updateOne(
    { _id: "62487fb5a68be9d1aba3ea19" },
    { friends: [], chats: [] }
  );
  await User.updateOne(
    { _id: "6244368013951a297f440b6e" },
    { friends: [], chats: [] }
  );
  await Chat.deleteMany({
    members: { $elemMatch: { member: "62487fb5a68be9d1aba3ea19" } },
  });
  return res.send("success");
}
