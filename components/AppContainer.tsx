import Logo from "./Logo";
import Contact from "./Contact";
import Menu from "./Menu";
import ContactList from "./ContactList";
import { useRouter } from "next/router";
import { ref, set, push } from "firebase/database";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
export default function AppContainer({ children }: Props) {
  const { data: auth } = useSession();
  const router = useRouter();
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (router.pathname === "/") {
      setMenuOpened(true);
      return; 
    }
    setMenuOpened(false)
  }, [router]);

  const addContact = () => {
    router.push("/add_chat");
  };
  return (
    <div className="flex z-0">
      <div
        className={`h-[100vh] bg-darkgreen pt-5 relative z-0 2xl:w-[20vw] lg:w-[35vw] lg:block ${
          menuOpened ? "w-[100vw]" : "hidden"
        } `}
      >
        <Logo />
        <ContactList />
        <div
          onClick={addContact}
          className="absolute bottom-6 right-6 bg-lightgreen text-black shadow-md shadow-gray-300 rounded-2xl text-4xl flex-center h-12 w-12 cursor-pointer pb-1 hover  "
        >
          +
        </div>
      </div>
      <div className={`${menuOpened ? "hidden" : "w-full"}`}>
        <div className="absolute right-10 top-5 flex-center gap-x-3">
          <img
            src={auth?.user?.image ?? ""}
            alt="Profile image"
            className="rounded-full h-12"
            referrerPolicy="no-referrer"
          />
          <span
            className="text-white text-xl lg:block hidden"
            data-cy="username"
          >
            {auth?.user?.name}
          </span>
          <Menu
            size={3}
            items={[
              { title: "#" + auth?.user?.name },
              { title: "Odhlásit", callback: signOut },
            ]}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
