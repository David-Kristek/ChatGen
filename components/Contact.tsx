import React from "react";
import { User } from "../context/AuthContext";
import { FiMoreVertical } from "react-icons/fi";
import Menu from "./Menu";

interface Props {
  user: User;
  lastMessage?: string;
  active?: boolean;
}

export default function Contact({ user, lastMessage, active }: Props) {
  const menuItems = [
    { title: "Odstranit konverzaci" },
    { title: "Zablokovat uživatele" },
  ];
  return (
    <div
      className={`pl-14 py-4  flex  mx-5 items-center relative rounded-2xl text-white mb-3 group cursor-pointer hover:bg-blackgreen ${
        active ? "bg-blackop shadow-sm shadow-gray-400" : "hover:shadow-md"
      }`}
    >
      <img
        src={user?.img}
        alt="Profile image"
        className="h-[50px] rounded-full"
      />
      <div className="pl-6 flex flex-col">
        <span className="text-xl">{user?.displayName}</span>
        {lastMessage && (
          <span className="text-[#ADADAD] text-xs pt-1">{lastMessage}</span>
        )}
      </div>
      <Menu
        size={3}
        className="absolute right-2 opacity-0 group-hover:opacity-100"
        items={menuItems}
      />
    </div>
  );
}
