import Logo from "../components/Logo";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import AppContainer from "../components/AppContainer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
function Home() {
  const router = useRouter();
  // router.replace("/chats/NnKSXp2SRdjctFaLURfD");
  // chaty z ChatsContext
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  return <></>;
}

export default Home;
