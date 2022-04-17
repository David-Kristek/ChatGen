import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Message from "../../components/Message";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  GetChatsDocument,
  GetMessagesDocument,
  Message as MessageType,
  NewMessageDocument,
  NewMessageSubscription,
  useGetMessagesQuery,
  useNewMessageSubscription,
  User,
  useSendMessageMutation,
} from "../../graphql/generated/schema";
import { useQuery, useSubscription } from "@apollo/client";
import apolloClient from "../../lib/apolloClient";

function Chat() {
  const router = useRouter();
  const { data: auth } = useSession();
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const { chatId } = router.query;
  const [sendMessage, { data: newMessage, error, loading: sendLoading }] =
    useSendMessageMutation();
  const { loading, data, subscribeToMore } = useGetMessagesQuery({
    variables: { chatId: String(chatId) },
  });
  const addNewMessage = useCallback((prev, newMessage) => {
    return {
      getMessages: {
        ...prev.getMessages,
        messages: prev.getMessages.messages
          ? [...prev.getMessages.messages, newMessage]
          : [newMessage],
      },
    };
  }, []);
  const contact = useMemo(() => {
    if (!data) return;
    // group ? null : members[0]._id === auth?.userId ? members[1] : members[0],
    const chat = data.getMessages?.chat;
    if (!chat) return;
    const { members, group, name, image } = chat;
    return group
      ? { name, image }
      : members[0]._id === auth?.userId
      ? members[1]
      : members[0];
  }, [data]);
  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const [messageInput, setMessageInput] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!messageInput) return;
    setMessageInput("");

    const res = await sendMessage({
      variables: { body: { text: messageInput }, chatId: String(chatId) },
    });
    console.log(res.data, "msg sent");

    apolloClient.cache.updateQuery(
      { query: GetMessagesDocument, variables: { chatId } },
      (data) => addNewMessage(data, res.data?.sendMessage)
    );
  };
  useEffect(() => {
    subscribeToMore({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // @ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        apolloClient.cache.updateQuery({ query: GetChatsDocument }, (data) => {
          return {
            getChats: data.getChats.map((chat) =>
              chat._id === newMessage.chat._id
                ? { ...chat, lastMessage: newMessage }
                : chat
            ),
          };
        });
        if (newMessage.chat._id === chatId)
          return addNewMessage(prev, newMessage);
        return prev;
      },
    });
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [data]);
  return (
    <>
      <div className="flex-center justify-start pl-[6%] pt-5 pb-3">
        <img
          src={contact?.image ?? ""}
          alt="Profile image"
          className="h-[63px] w-[63px] rounded-full mr-3"
          onClick={scrollToBottom}
        />
        <div className="text-2xl text-white">
          <span>{contact?.name}</span>
          <span className="flex-center justify-end">
            <div className="h-3 w-3 mr-1 bg-green-500 rounded-full" />
            <div className="text-xs text-[#ADADAD] ">Právě aktivní</div>
          </span>
        </div>
      </div>
      <div className="overflow-auto relative  h-[calc(100vh-175px)]">
        {data?.getMessages?.messages &&
          data.getMessages.messages.map((message) => (
            <Message
              text={message?.body?.text ?? ""}
              received={
                auth?.userId != message.sendFrom._id
                  ? message.sendFrom
                  : undefined
              }
              key={message._id}
            />
          ))}

        <div ref={bottomOfChat}></div>
      </div>
      <form className="w-full h-16 relative" onSubmit={onSubmit}>
        <div className="absolute bottom-0 flex gap-x-4  inset-x-0 px-10">
          {/* pri psani prodlouzeni inputu */}
          <input
            type="text"
            className="input w-[85%]"
            placeholder="Napište @JohnDoe ..."
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
          />
          <MdSend className="icon" onClick={onSubmit} />
          <MdAddPhotoAlternate className="icon" />
          <AiOutlinePlusCircle className="icon" />
        </div>
      </form>
    </>
  );
}
export default Chat;

export async function getServerSideProps(context) {
  const ss = await getSession(context);
  if (!ss)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  return {
    props: {},
  };
}
