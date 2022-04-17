import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  NewChatDocument,
  useGetChatsQuery,
  useNewChatSubscription,
} from "../graphql/generated/schema";
import Contact from "./Contact";

export default function ContactList() {
  const { data: chats, loading, error, subscribeToMore } = useGetChatsQuery();
  const router = useRouter();
  useEffect(() => {
    // if (!loading && (chats?.getChats?.length ?? 0) > 0) {
    // }
    console.log("starting on ");
    // subscription is sent even for the user himself
    subscribeToMore({
      document: NewChatDocument,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData, "subscripiton");

        if (!subscriptionData.data) return prev;
        // @ts-ignore
        const newChat = subscriptionData.data.newChat;
        return {
          getChats: prev.getChats ? [newChat, ...prev.getChats] : [newChat],
        };
      },
    });
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
