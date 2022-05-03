import React, { useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import {
  ChatActionsDocument,
  GetCurrentChatDocument,
  GetMessagesDocument,
  MemberActiveInChatDocument,
  useGetCurrentChatQuery,
} from "../../graphql/generated/schema";
import { initializeApollo } from "../../lib/apolloClient";
import MessageForm from "../../components/MessageForm";
import Top from "../../components/Top";
import ChatBody from "../../components/ChatBody";
import { chatActions, memberActiveInChat } from "../../lib/chatHelper";

function Chat() {
  const router = useRouter();

  const chatId = router.query.chatId as string;

  const { data: chatData, subscribeToMore: subscribeToMoreChat } =
    useGetCurrentChatQuery({
      variables: { chatId },
      fetchPolicy: "cache-first",
    });
  const bottomOfChat = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    subscribeToMoreChat({
      document: MemberActiveInChatDocument,
      variables: { chatId },
      updateQuery: memberActiveInChat,
    });
    subscribeToMoreChat({
      document: ChatActionsDocument,
      variables: { chatId },
      updateQuery: chatActions,
    });
  }, []);
  return (
    <>
      <Top chat={chatData?.getCurrentChat} />
      <ChatBody
        chat={chatData?.getCurrentChat}
        scrollToBottom={scrollToBottom}
        bottomOfChat={bottomOfChat}
      />
      <MessageForm
        approved={!chatData?.getCurrentChat.approved}
        scrollToBottom={scrollToBottom}
      />
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
