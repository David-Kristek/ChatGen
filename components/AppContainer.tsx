import Logo from "./Logo";
import Contact from "./Contact";
import Menu from "./Menu";
import { useAuth } from "../context/AuthContext";
import ContactList from "./ContactList";
import { useRouter } from "next/router";
import { ref, set, push } from "firebase/database";
import { signOut, useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}
export default function AppContainer({ children }: Props) {
  const { data: auth } = useSession();
  const router = useRouter();
  const addContact = () => {
    router.push("/add_chat");
  };
  return (
    <div className="grid grid-cols-5">
      <div className="h-[100vh] bg-darkgreen pt-5 relative">
        <Logo />
        <ContactList />
        <div
          onClick={addContact}
          className="absolute bottom-6 right-6 bg-lightgreen text-black shadow-md shadow-gray-300 rounded-2xl text-4xl flex-center h-12 w-12 cursor-pointer pb-1 hover  "
        >
          +
        </div>
      </div>
      <div className="col-span-4">
        <div className="absolute right-10 top-5 flex-center gap-x-3">
          <img
            src={auth?.user?.image ?? ""}
            alt="Profile image"
            className="rounded-full h-12"
          />
          <span className="text-white text-xl">{auth?.user?.name}</span>
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
