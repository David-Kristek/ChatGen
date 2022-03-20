import Logo from "../components/Logo";
import { withProtected } from "../lib/Routes";
import { PageProps } from "./_app";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import HomeContainer from "../components/HomeContainer";
import { useRouter } from "next/router";
function Home({ auth }: PageProps) {
  const router = useRouter();
  router.replace("/chats/nejaktulnejsichat");

  return (
    <HomeContainer>
      <></>
    </HomeContainer>
  );
}

export default withProtected(Home);
