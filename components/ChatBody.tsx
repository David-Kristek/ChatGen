import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Chat,
  NewMessageDocument,
  useGetMessagesQuery,
  useLastActiveMutation,
} from "../graphql/generated/schema";
import { addNewMessage, addNewMessageToAnotherChat } from "../lib/chatHelper";
import ClipLoader from "react-spinners/ClipLoader";
import Time from "./Time";
import Message from "./Message";
import ReadBy from "./ReadBy";
import TypingUsers from "./TypingUsers";
import { useApolloClient } from "@apollo/client";

interface Props {
  chat?: Chat;
  bottomOfChat: React.RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
}

export default function ChatBody({
  chat,
  bottomOfChat,
  scrollToBottom,
}: Props) {
  const router = useRouter();
  const { data: auth } = useSession();
  const apolloClinet = useApolloClient();
  const chatId = router.query.chatId as string;
  const [moreMessageLoading, setMoreMessageLoading] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);

  const {
    data,
    subscribeToMore: subscribeToMoreMessages,
    fetchMore,
  } = useGetMessagesQuery({
    variables: { chatId, cursor: 0 },
    fetchPolicy: "cache-first", // Used for first execution
    // nextFetchPolicy: "cache-only",
    onCompleted: (datas) => {
      if (datas.getMessages && datas.getMessages?.length <= 14)
        setTimeout(scrollToBottom, 10);
    },
  });
  const [lastActive, { data: sent }] = useLastActiveMutation({
    variables: { chatId },  
  });
  const fetchMoreMessages = () => {
    if (
      (data?.getMessages && data.getMessages?.length <= 14) ||
      !data?.getMessages
    )
      return;
    setMoreMessageLoading(true);
    let scrollPosition = messagesRef.current?.scrollHeight;
    fetchMore({
      variables: { chatId, cursor: data?.getMessages?.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newMessages = fetchMoreResult?.getMessages;
        if (!newMessages || !prev.getMessages) return prev;
        return {
          getMessages: [...newMessages, ...prev.getMessages],
        };
      },
    }).then(() => {
      setMoreMessageLoading(false);
      messagesRef.current?.scrollTo(
        0,
        Number(messagesRef.current.scrollHeight - (scrollPosition || 0))
      );
    });
  };
  const newMessage = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) return prev;
    // @ts-ignore
    const newMessage = {
      ...subscriptionData.data.newMessage,
      createdAt: new Date(),
      body: { ...subscriptionData.data.newMessage.body, msg: "" },
    };

    if (newMessage.chat._id === chatId) {
      lastActive();
      scrollToBottom();
      return addNewMessage(prev, newMessage);
    }
    addNewMessageToAnotherChat(apolloClinet, newMessage.chat._id, newMessage);
    scrollToBottom();
    return prev;
  };

  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages({
      document: NewMessageDocument,
      updateQuery: newMessage,
    });
    return () => {
      if(unsubscribe) unsubscribe(); 
    }
  }, [chatId]);

  return (
    <div
      className="overflow-auto relative  h-[calc(100vh-175px)]"
      onScroll={() => {
        if (messagesRef.current?.scrollTop === 0) {
          fetchMoreMessages();
        }
      }}
      ref={messagesRef}
    >
      {moreMessageLoading && (data?.getMessages?.length ?? 0) > 13 ? (
        <ClipLoader
          color={"lightgreen"}
          loading={moreMessageLoading}
          size={35}
          css={"display: block; margin: 0 auto; "}
        />
      ) : (
        <div className={"h-[35px]"}></div>
      )}
      {data?.getMessages &&
        data.getMessages.map((message, index) => (
          <div key={index}>
            <Time
              time={message.createdAt}
              prevTime={
                data?.getMessages && data.getMessages[index - 1]?.createdAt
              }
            />
            <Message
              body={message.body}
              received={
                auth?.userId != message.sendFrom._id
                  ? message.sendFrom
                  : undefined
              }
              key={message._id}
            />
          </div>
        ))}
      {chat?.members && data?.getMessages && (
        <ReadBy
          members={chat.members}
          lastMessage={data.getMessages[data.getMessages?.length - 1]}
        />
      )}
      <TypingUsers
        lastMessage={
          data?.getMessages
            ? data.getMessages[data.getMessages?.length - 1]
            : undefined
        }
        height={messagesRef.current?.scrollHeight}
      />
      <div ref={bottomOfChat}></div>
    </div>
  );
}
