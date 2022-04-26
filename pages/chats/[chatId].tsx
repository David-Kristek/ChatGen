import React, { useRef, useEffect, useState, useMemo } from "react";
import Message from "../../components/Message";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  GetMessagesDocument,
  MemberActiveInChatDocument,
  NewMessageDocument,
  useGetMessagesQuery,
  useLastActiveMutation,
  useSendMessageMutation,
  useUserTypingMutation,
} from "../../graphql/generated/schema";
import { useApolloClient } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";
import Image from "next/image";
import Time from "../../components/Time";
import {
  addNewMessage,
  contactSelecter,
  updateChat,
} from "../../lib/chatHelper";
import ReadBy from "../../components/ReadBy";
import TypingUsers from "../../components/TypingUsers";
function Chat() {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { data: auth } = useSession();
  const bottomOfChat = useRef<HTMLDivElement>(null);

  const { chatId } = router.query;
  const [sendMessage, { data: newMessage, error, loading: sendLoading }] =
    useSendMessageMutation();
  const { loading, data, subscribeToMore } = useGetMessagesQuery({
    variables: { chatId: String(chatId) },
    fetchPolicy: "cache-first", // Used for first execution
    // nextFetchPolicy: "cache-only",
  });
  const [lastActive, { data: sent }] = useLastActiveMutation({
    variables: { chatId: String(chatId) },
  });

  const [isTyping, mtRes] = useUserTypingMutation({
    variables: { chatId: String(chatId) },
  });
  const contact = useMemo(() => {
    if (!data) return;
    const chat = data.getMessages?.chat;
    if (!chat) return;
    return contactSelecter(chat, String(auth?.userId));
  }, [data]);
  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const [readBy, setreadBy] = useState<any>(data?.getMessages?.chat.members);
  const [messageInput, setMessageInput] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!messageInput) return;
    setMessageInput("");

    const res = await sendMessage({
      variables: { body: { text: messageInput }, chatId: String(chatId) },
    });

    await lastActive();
    apolloClient.cache.updateQuery(
      {
        query: GetMessagesDocument,
        variables: { chatId },
      },
      (data) => addNewMessage(data, res.data?.sendMessage)
    );
  };
  const setLastActive = () => {
    lastActive().then((res) => console.log("res", res));
  };
  useEffect(() => {
    subscribeToMore({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // @ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        updateChat(newMessage, apolloClient);

        if (newMessage.chat._id === chatId) {
          setLastActive();
          return addNewMessage(prev, newMessage);
        }
        return prev;
      },
    });
    subscribeToMore({
      document: MemberActiveInChatDocument,
      variables: { chatId: String(chatId) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        let newData = JSON.parse(JSON.stringify(prev));
        // @ts-ignore
        const newMemberActive = subscriptionData.data.nowActiveInChat;

        newData.getMessages.chat.members = prev.getMessages?.chat?.members.map(
          (member) => {
            return member.member._id === newMemberActive.userId
              ? { ...member, lastActive: newMemberActive.active }
              : member;
          }
        );
        setreadBy(newData.getMessages.chat.members);
        return newData;
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
          data.getMessages.messages.map((message, index) => (
            <div key={index}>
              <Time
                time={message.createdAt}
                prevTime={
                  data?.getMessages?.messages &&
                  data.getMessages.messages[index - 1]?.createdAt
                }
              />
              <Message
                text={message?.body?.text ?? ""}
                received={
                  auth?.userId != message.sendFrom._id
                    ? message.sendFrom
                    : undefined
                }
                key={message._id}
              />
            </div>
          ))}

        {readBy && data?.getMessages?.messages && (
          <ReadBy
            members={readBy}
            lastMessage={
              data?.getMessages?.messages[data.getMessages.messages?.length - 1]
            }
          />
        )}
        <TypingUsers
          lastMessage={
            data?.getMessages?.messages
              ? data?.getMessages?.messages[
                  data.getMessages.messages?.length - 1
                ]
              : undefined
          }
        />
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
            onKeyUp={() => {
              if (messageInput.length > 1) isTyping();
            }}
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
export const getServerSideProps = async (ctx) => {
  const ss = await getSession(ctx);
  if (!ss)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  const client = initializeApollo();
  const Cookie = ctx.req.headers.cookie;

  await client.query({
    query: GetMessagesDocument,
    variables: { chatId: ctx.params.chatId },
    context: { headers: { Cookie } },
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};
