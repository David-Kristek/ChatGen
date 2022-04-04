import React, { useState, useEffect, useMemo } from "react";
import Menu from "./Menu";
import { useRouter } from "next/router";
import Link from "next/link";
import { User, Chat } from "../Models/Types";
import { useSession } from "next-auth/react";

interface Props {
  chat: Chat;
}

export default function Contact({ chat }: Props) {
  const { _id, name, image, members, group } = chat;
  const { data: auth } = useSession();
  const contact = useMemo(
    () =>
      group ? null : members[0]._id === auth?.userId ? members[1] : members[0],
    [chat]
  );
  const router = useRouter();
  const menuItems = [
    { title: "Odstranit konverzaci" },
    { title: "Zablokovat uživatele" },
  ];
  return (
    <Link href={`/chats/${_id}`}>
      <div
        className={`pl-14 py-4  flex  mx-5 items-center relative rounded-2xl text-white mb-3 group cursor-pointer hover:bg-blackgreen ${
          router.query.chatId === chat._id
            ? "bg-blackop shadow-sm shadow-gray-400"
            : "hover:shadow-md"
        }`}
      >
        <img
          src={contact?.image ?? image}
          alt="Profile image"
          className="h-[50px] rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="pl-6 flex flex-col">
          <span className="text-xl">{contact?.name ?? name}</span>
          {chat.lastMessage && (
            <span className="text-[#ADADAD] text-xs pt-1 font-extrabold">
              {chat.lastMessage.body.text}
            </span>
          )}
        </div>
        <Menu
          size={3}
          className="absolute right-2 opacity-0 group-hover:opacity-100"
          items={menuItems}
        />
      </div>
    </Link>
  );
}
