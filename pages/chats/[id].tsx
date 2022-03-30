import React, { useRef, useEffect, useState } from "react";
import AppContainer from "../../components/AppContainer";
import Message from "../../components/Message";
import { withProtected } from "../../lib/Routes";
import { PageProps } from "../_app";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { sendChatMessage, useGetChats, useGetMessages } from "../../lib/Chats";
import { useRouter } from "next/router";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db } from "../../firebaseconfig";

function Chat({ auth }: PageProps) {
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const [messageInput, setMessageInput] = useState("");
  const [messages] = useGetMessages(String(id));

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await sendChatMessage(messageInput, String(id), auth.user?.uid ?? "");
    setMessageInput("");
  };
  useEffect(() => {
    scrollToBottom(), console.log(messages);
  }, [scrollToBottom]);
  return (
    <>
      <div className="flex-center justify-start pl-[6%] pt-5 pb-3">
        <img
          src={auth.user?.img}
          alt="Profile image"
          className="h-[63px] w-[63px] rounded-full mr-3"
          onClick={scrollToBottom}
        />
        <div className="text-2xl text-white">
          <span> John Doe</span>
          <span className="flex-center justify-end">
            <div className="h-3 w-3 mr-1 bg-green-500 rounded-full" />
            <div className="text-xs text-[#ADADAD] ">Právě aktivní</div>
          </span>
        </div>
      </div>
      <div className="overflow-auto relative  h-[calc(100vh-175px)]">
        {messages.map((message) => (
          <Message
            text={message.body}
            received={
              auth.user?.uid != message.sendFrom?.uid
                ? message.sendFrom
                : undefined
            }
            key={message.id}
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
export default withProtected(Chat);
