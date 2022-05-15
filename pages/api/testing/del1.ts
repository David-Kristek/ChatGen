// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/MongoDB";
import Chat from "../../../Models/Chat";
import Message from "../../../Models/Message";
import User from "../../../Models/User";
// import { User as UserType } from "../../../Models/_Types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { _id } = await Chat.findOne({
    members: { $elemMatch: { member: "62487fb5a68be9d1aba3ea19" } },
  });
  await Message.deleteMany({ chat: _id });
  return res.send("success");
}
