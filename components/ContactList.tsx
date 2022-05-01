import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  NewMessageDocument,
  useGetChatsQuery,
  useNewChatSubscription,
} from "../graphql/generated/schema";
import Contact from "./Contact";

import ClipLoader from "react-spinners/ClipLoader";
import { route } from "next/dist/server/router";

export default function ContactList() {
  const { data: chats, loading, error, subscribeToMore } = useGetChatsQuery();
  // const {data} = useNewChatSubscription(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading && (chats?.getChats?.length ?? 0) > 0) {
    }
    // subscription is sent even for the user himself

    // subscribeToMore({
    //   document: NewChatDocument,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     return prev; 
    //     if (!subscriptionData.data) return prev;
    //     // @ts-ignore
    //     const newChat = subscriptionData.data.newChat;
    //     return {
    //       getChats: prev.getChats ? [newChat, ...prev.getChats] : [newChat],
    //     };
    //   },
    // });
    // subscribeToMore({
    //   document: NewChatDocument,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     return prev;
    //   },
    // });

    subscribeToMore({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        let thisChat;
        console.log("updating");
        // @ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        const getChats = prev.getChats;
        if (!getChats) return prev;
        let chats = getChats.filter((chat, index) => {
          if (chat._id === newMessage?.chat?._id) {
            thisChat = chat;
            return false;
          }
          return true;
        });
        thisChat = { ...thisChat, lastMessage: newMessage };
        chats = [thisChat, ...chats];
        return {
          getChats: chats,
        };
      },
    });
  }, []);

  return (
    <div className="mt-10">
      {loading ? (
        <div>
          <ClipLoader
            color={"lightgreen"}
            loading={loading}
            size={35}
            css={"display: block; margin: 0 auto"}
          />
        </div>
      ) : (
        chats &&
        chats.getChats &&
        chats.getChats.map((chat, index) => (
          <Contact chat={chat} index={index} key={index} />
        ))
      )}
    </div>
  );
}
