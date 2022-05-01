import React, { useState, useEffect, useMemo, useRef } from "react";
import Menu from "./Menu";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Chat,
  GetChatsDocument,
  GetMessagesDocument,
} from "../graphql/generated/schema";
import truncate from "truncate";
import { motion } from "framer-motion";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useApolloClient } from "@apollo/client";
import { contactSelecter } from "../lib/chatHelper";

interface Props {
  chat: Chat;
  index: number;
}

export default function Contact({ chat, index }: Props) {
  const { _id, name, image, members, group, lastMessage } = chat;
  const { data: auth } = useSession();
  const [contactLoading, setcontactLoading] = useState(false);
  const ref = useRef<LoadingBarRef>(null);
  const apolloClient = useApolloClient();
  const contact = useMemo(() => {
    return contactSelecter(chat, String(auth?.userId));
  }, [chat]);
  const router = useRouter();
  const isMessageNew = useMemo(() => {
    const userLastActivityInChat = members.find(
      (member) => auth?.userId === member.member._id
    )?.lastActive;
    
    if(router.query.chatId === chat._id) return false;  
    return (
      new Date(lastMessage?.createdAt).getTime() >
      new Date(userLastActivityInChat).getTime()  + 1000 
    );
  }, [lastMessage, router]);
  const menuItems = [
    { title: "Odstranit konverzaci" },
    { title: "Zablokovat uživatele" },
  ];
  const setTopLoading = async () => {
    const ulrChatId = router.query.chatId;
    if (ulrChatId === _id) return;

    const isChatInCache = await apolloClient.readQuery({
      query: GetMessagesDocument,
      variables: { chatId: _id },
    });
    if (!isChatInCache) ref.current?.complete();
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
      onClick={setTopLoading}
    >
      <LoadingBar color="#50B661" ref={ref} />
      <Link href={`/chats/${_id}`}>
        <div
          className={`py-4 pr-5  flex  mx-5 items-center relative rounded-2xl text-white mb-3 group cursor-pointer hover:bg-blackgreen   ${
            router.query.chatId === chat._id
              ? "bg-blackop shadow-sm shadow-gray-400"
              : "hover:shadow-md"
          }`}
        >
          <img
            src={String(contact?.image)}
            alt="Profile image"
            className="h-[50px] rounded-full ml-14 "
            referrerPolicy="no-referrer"
          />
          <div className="pl-6 flex flex-col">
            <span className={`text-xl ${isMessageNew && "font-bold"}`}>{contact?.name}</span>
            {lastMessage && (
              <span className="text-[#ADADAD] text-xs pt-1">
                <span className={` text-lightgreen ${isMessageNew ? "font-extrabold" : "font-bold"} `}>
                  {lastMessage.sendFrom.name.split(" ")[0] + ": "}
                </span>
                <span className={isMessageNew ? "font-bold" : ""}>
                {truncate(String(lastMessage.body.text), 44)}
                </span>
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
    </motion.div>
  );
}
