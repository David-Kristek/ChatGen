import React, { useRef, useEffect, useState } from "react";
import AppContainer from "../../components/AppContainer";
import Message from "../../components/Message";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MESSAGES, SEND_MESSAGE } from "../../graphql/queries";

function Chat() {
  const router = useRouter();
  const { data: auth } = useSession();
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const { chatId } = router.query;
  const [sendMessage, { data: newMessage, error, loading: sendLoading }] =
    useMutation(SEND_MESSAGE);
  const { loading, data } = useQuery(GET_MESSAGES, {
    variables: { chatId },
  });

  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const [messageInput, setMessageInput] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await sendMessage({
      variables: { body: { text: messageInput }, chatId },
    });

    setMessageInput("");
  };
  // useEffect(() => {
  //   scrollToBottom(), console.log(messages);
  // }, [scrollToBottom]);
  return (
    <>
      <div className="flex-center justify-start pl-[6%] pt-5 pb-3">
        {/* <img
          src={auth.user?.img}
          alt="Profile image"
          className="h-[63px] w-[63px] rounded-full mr-3"
          onClick={scrollToBottom}
        /> */}
        <div className="text-2xl text-white">
          <span> John Doe</span>
          <span className="flex-center justify-end">
            <div className="h-3 w-3 mr-1 bg-green-500 rounded-full" />
            <div className="text-xs text-[#ADADAD] ">Právě aktivní</div>
          </span>
        </div>
      </div>
      <div className="overflow-auto relative  h-[calc(100vh-175px)]">
        {data?.getMessages &&
          data.getMessages.map((message) => (
            <Message
              text={message.body.text}
              received={
                auth?.userId != message.sendFrom?._id
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
