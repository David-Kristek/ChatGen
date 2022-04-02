import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const withAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return {red: res.redirect("/api/auth/signin"), user: null};
  return {user: session.user, res : null};
};
