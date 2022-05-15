import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetMessagesDocument, useLastActiveMutation, useSendMessageMutation, useUserTypingMutation } from "../graphql/generated/schema";
import { addNewMessage, updateChat } from "../lib/chatHelper";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  approved?: boolean | null;
  scrollToBottom: () => void; 
}

export default function MessageForm({approved, scrollToBottom} : Props) {
  const router = useRouter(); 
  const chatId = router.query.chatId as string; 
  const apolloClient = useApolloClient(); 
  const [sendMessage, { data: newMessage, error, loading: sendLoading }] =
    useSendMessageMutation();
  const [lastActive, { data: sent }] = useLastActiveMutation({
    variables: { chatId},
  });
  const [isTyping, mtRes] = useUserTypingMutation({
    variables: { chatId },
  });
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
        variables: { chatId, cursor: 0 },
      },
      (data) => addNewMessage(data, res.data?.sendMessage)
    );
    updateChat(res.data?.sendMessage, apolloClient);
    scrollToBottom();
  };

  return (
    <form className="w-full h-16 relative" onSubmit={onSubmit}>
      <div className="absolute bottom-0 flex gap-x-4  inset-x-0 px-10">
        {/* pri psani prodlouzeni inputu */}
        <input
          type="text"
          className={`input w-[85%] ${approved && "cursor-not-allowed"}`}
          disabled={approved ?? true}
          placeholder="Napište @JohnDoe ..."
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyUp={() => {
            if (messageInput.length > 1) isTyping();
          }}
          value={messageInput}
          cy-data="message-input"
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
  );
}
