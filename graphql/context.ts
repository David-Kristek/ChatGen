import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../lib/MongoDB";
import { User } from "./generated/schema";

export type Context = {
  user: User | null;
  db: any;
};
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const session = await getSession({ req });
  const user = { ...session?.user, _id: session?.userId } as User;
  const db = await dbConnect();
  return {
    user,
    db,
  };
}
