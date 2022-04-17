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
import Image from "next/image";

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
  const updateChat = useCallback((newMessage) => {
    apolloClient.cache.updateQuery({ query: GetChatsDocument }, (data) => {
      let thisChat;
      let chats = data.getChats.filter((chat, index) => {
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
    });
  }, []);

  const contact = useMemo(() => {
    if (!data) return;
    // group ? null : members[0]._id === auth?.userId ? members[1] : members[0],
    const chat = data.getMessages?.chat;
    console.log(chat, "chat");
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

    apolloClient.cache.updateQuery(
      { query: GetMessagesDocument, variables: { chatId } },
      (data) => addNewMessage(data, res.data?.sendMessage)
    );
    updateChat(res.data?.sendMessage);
  };
  useEffect(() => {
    subscribeToMore({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // @ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        updateChat(newMessage);
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
        {contact?.image && (
          <Image
            src={contact.image}
            alt="Profile image"
            className=" rounded-full"
            height={63}
            width={63}
            onClick={scrollToBottom}
          />
        )}
        <div className="text-2xl text-white  ml-3">
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
