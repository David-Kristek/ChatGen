import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetChatsQuery } from "../graphql/generated/schema";
import { GET_CHATS } from "../graphql/queries";
import Contact from "./Contact";

export default function ContactList() {
  const {
    data: chats,
    loading,
    error,
  } = useGetChatsQuery( );
  const router = useRouter();

  useEffect(() => {
    // if (!loading && (chats?.getChats?.length ?? 0) > 0) {
    // }
  }, [chats]);

  return (
    <div className="mt-10">
      {chats &&
        chats.getChats &&
        chats.getChats.map((chat, index) => (
          <Contact chat={chat} key={index} />
        ))}
    </div>
  );
}
