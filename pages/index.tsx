import Logo from "../components/Logo";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import AppContainer from "../components/AppContainer";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import dbConnect from "../lib/MongoDB";
import User from "../Models/User";
import Chat from "../Models/Chat";
import { useEffect } from "react";
import useWidth from "../hooks/useWidth";
function Home({ redirect }) {
  const router = useRouter();
  const width = useWidth();
  // router.replace("/chats/NnKSXp2SRdjctFaLURfD");
  // chaty z ChatsContext
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  useEffect(() => {
    if (!redirect) router.push("/add_chat");
    if (redirect && width > 1024) {
      router.push(`/chats/${redirect}`);
      return;
    }
  }, [width]);

  return <></>;
}

export default Home;

export const getServerSideProps = async (ctx) => {
  const ss = await getSession(ctx);
  console.log(ss);
  if (!ss)

    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  await dbConnect();
  const redirect = (
    await User.findOne({ _id: ss.userId }).populate({
      path: "chats",
      model: Chat,
      options: { sort: { lastActivity: -1 }, limit: 1 },
    })
  )?.chats[0]?._id;
  // if (redirect)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: `/chats/${redirect}`,
  //     },
  //   };
  // return {
  //   redirect: {
  //     permanent: false,
  //     destination: `/add_chat`,
  //   },
  // };
  return {
    props: {
      redirect: JSON.parse(JSON.stringify(redirect ?? "")),
    },
  };
};
