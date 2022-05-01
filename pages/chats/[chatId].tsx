import React, { useRef, useEffect, useState, useMemo } from "react";
import Message from "../../components/Message";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  ChatActionsDocument,
  GetCurrentChatDocument,
  GetMessagesDocument,
  MemberActiveInChatDocument,
  NewMessageDocument,
  useGetCurrentChatQuery,
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
import ClipLoader from "react-spinners/ClipLoader";
function Chat() {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { data: auth } = useSession();
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const { chatId } = router.query;
  const [sendMessage, { data: newMessage, error, loading: sendLoading }] =
    useSendMessageMutation();
  const [moreMessageLoading, setMoreMessageLoading] = useState(false);
  const {
    loading,
    data,
    subscribeToMore: subscribeToMoreMessages,
    fetchMore,
  } = useGetMessagesQuery({
    variables: { chatId: String(chatId), cursor: 0 },
    fetchPolicy: "cache-first", // Used for first execution
    // nextFetchPolicy: "cache-only",
    onCompleted: (datas) => {
      console.log(datas.getMessages?.length, "length");

      if (datas.getMessages && datas.getMessages?.length <= 14)
        setTimeout(scrollToBottom, 40);
    },
  });
  const { data: chatData, subscribeToMore: subscribeToMoreChat } =
    useGetCurrentChatQuery({
      variables: { chatId: String(chatId) },
      fetchPolicy: "cache-first",
    });
  const [lastActive, { data: sent }] = useLastActiveMutation({
    variables: { chatId: String(chatId) },
  });

  const [isTyping, mtRes] = useUserTypingMutation({
    variables: { chatId: String(chatId) },
  });
  const contact = useMemo(() => {
    if (!data) return;
    const chat = chatData?.getCurrentChat;
    if (!chat) return;
    return contactSelecter(chat, String(auth?.userId));
  }, [data]);
  const [readBy, setreadBy] = useState<any>(chatData?.getCurrentChat.members);
  const [messageInput, setMessageInput] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!messageInput) return;
    setMessageInput("");
    const res = await sendMessage({
      variables: { body: { text: messageInput }, chatId: String(chatId) },
    });

    await lastActive();
    console.log("updating ");

    apolloClient.cache.updateQuery(
      {
        query: GetMessagesDocument,
        variables: { chatId, cursor: 0 },
      },
      (data) => addNewMessage(data, res.data?.sendMessage)
    );
    updateChat(res.data?.sendMessage, apolloClient);
    scrollToBottom();
  };
  const setLastActive = () => {
    lastActive().then((res) => console.log("res", res));
  };
  const fetchMoreMessages = () => {
    setMoreMessageLoading(true);
    let scrollPosition = messagesRef.current?.scrollHeight;
    fetchMore({
      variables: { chatId: String(chatId), cursor: data?.getMessages?.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(fetchMoreResult, "fetched more");

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
  useEffect(() => {
    subscribeToMoreMessages({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // @ts-ignore
        const newMessage = subscriptionData.data.newMessage;

        if (newMessage.chat._id === chatId) {
          setLastActive();
          return addNewMessage(prev, newMessage);
        }
        scrollToBottom();
        return prev;
      },
    });
    subscribeToMoreChat({
      document: MemberActiveInChatDocument,
      variables: { chatId: String(chatId) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        let newData = JSON.parse(JSON.stringify(prev));
        // @ts-ignore
        const newMemberActive = subscriptionData.data.nowActiveInChat;

        newData.getCurrentChat.members = prev.getCurrentChat.members.map(
          (member) => {
            return member.member._id === newMemberActive.userId
              ? { ...member, lastActive: newMemberActive.active }
              : member;
          }
        );
        setreadBy(newData.getCurrentChat.members);
        return newData;
      },
    });
    subscribeToMoreChat({
      document: ChatActionsDocument,
      variables: { chatId: String(chatId) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        // @ts-ignore
        const action = subscriptionData.data.chatActions;
        if (action === "approved") {
          var newObject = JSON.parse(JSON.stringify(prev));
          newObject.getCurrentChat.approved = true;
          return newObject;
        }
        return prev;
      },
    });
  }, []);
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
        <div className="text-`2`xl text-white  ml-3">
          <span>{contact?.name}</span>
          <span className="flex-center justify-end">
            <div className="h-3 w-3 mr-1 bg-green-500 rounded-full" />
            <div className="text-xs text-[#ADADAD] ">Právě aktivní</div>
          </span>
        </div>
      </div>
      <div
        className="overflow-auto relative  h-[calc(100vh-175px)]"
        onScroll={() => {
          if (messagesRef.current?.scrollTop === 0) {
            fetchMoreMessages();
          }
        }}
        ref={messagesRef}
      >
        {moreMessageLoading ? (
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
        {readBy && data?.getMessages && (
          <ReadBy
            members={readBy}
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
        {/* <div className="h-8 w-8  bg-red-900 absolute">ad</div> */}
        <div ref={bottomOfChat}></div>
      </div>
      <form className="w-full h-16 relative" onSubmit={onSubmit}>
        <div className="absolute bottom-0 flex gap-x-4  inset-x-0 px-10">
          {/* pri psani prodlouzeni inputu */}
          <input
            type="text"
            className="input w-[85%]"
            disabled={!chatData?.getCurrentChat.approved ?? true}
            placeholder="Napište @JohnDoe ..."
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyUp={() => {
              if (messageInput.length > 1) isTyping();
            }}
            value={messageInput}
          />

          {sendLoading ? (
            <ClipLoader color="#50B661" loading={sendLoading} />
          ) : (
            <MdSend className="icon" onClick={onSubmit} />
          )}
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
    variables: { chatId: ctx.params.chatId, cursor: 0 },
    context: { headers: { Cookie } },
  });
  await client.query({
    query: GetCurrentChatDocument,
    variables: { chatId: ctx.params.chatId },
    context: { headers: { Cookie } },
  });
  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};
