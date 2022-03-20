import Logo from "../components/Logo";
import { withProtected } from "../lib/Routes";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import { useAuth } from "../context/AuthContext";
import ContactList from "./ContactList";
import { useRouter } from "next/router";
interface Props {
  children: React.ReactNode;
}
export default function HomeContainer({ children }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const addContact = () => {
    router.push("/add_contact");
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
            src={auth.user?.img}
            alt="Profile image"
            className="rounded-full h-12"
          />
          <span className="text-white text-xl">{auth.user?.displayName}</span>
          <Menu logout={auth.logout} size={3} />
        </div>
        {children}
      </div>
    </div>
  );
}
