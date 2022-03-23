import React, { useState, useEffect } from "react";
import { User } from "../context/AuthContext";
import { FiMoreVertical } from "react-icons/fi";
import Menu from "./Menu";
import { Chat, getUserFromReference } from "../lib/Chats";
import { DocumentReference } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  chatId: string;
  user?: DocumentReference<User>;
  lastMessage?: string;
}

export default function Contact({ user, lastMessage, chatId }: Props) {
  const [chatInfo, setChatInfo] = useState({ title: "", img: "" });
  const [active, setActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("useEffect triggered");

    if (user)
      getUserFromReference(user).then((res) => {
        setChatInfo({
          title: res?.displayName ?? "",
          img: res?.img ?? "",
        });
      });
  }, []);
  useEffect(() => {
    setActive(router.query.id === chatId);
  }, [router]);

  const menuItems = [
    { title: "Odstranit konverzaci" },
    { title: "Zablokovat uživatele" },
  ];
  return (
    <Link href={`/chats/${chatId}`}>
      <div
        className={`pl-14 py-4  flex  mx-5 items-center relative rounded-2xl text-white mb-3 group cursor-pointer hover:bg-blackgreen ${
          active ? "bg-blackop shadow-sm shadow-gray-400" : "hover:shadow-md"
        }`}
      >
        {!chatInfo.img ? (
          <></>
        ) : (
          <>
            {" "}
            <img
              src={chatInfo.img}
              alt="Profile image"
              className="h-[50px] rounded-full"
            />
            <div className="pl-6 flex flex-col">
              <span className="text-xl">{chatInfo.title}</span>
              {lastMessage && (
                <span className="text-[#ADADAD] text-xs pt-1">
                  {lastMessage}
                </span>
              )}
            </div>
            <Menu
              size={3}
              className="absolute right-2 opacity-0 group-hover:opacity-100"
              items={menuItems}
            />
          </>
        )}
      </div>
    </Link>
  );
}
