import React, { useRef, useEffect, useState } from "react";
import AppContainer from "../../components/AppContainer";
import Message from "../../components/Message";
import { withProtected } from "../../lib/Routes";
import { PageProps } from "../_app";
import { MdAddPhotoAlternate, MdSend } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

function Chat({ auth }: PageProps) {
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (!bottomOfChat.current) return;
    console.log("scrolling");
    bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
  };
  const [messageInput, setMessageInput] = useState("");
  useEffect(
    () => {
      setTimeout(scrollToBottom, 100);
    },
    // [messages]
    []
  );

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
        <Message text="Ahoj jak se máš ?" />
        <Message
          text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička."
          received={{
            uid: "",
            displayName: "John Alepskij Lol",
            img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
            email: "david.kristek05@gmail.com",
            key: ""
          }}
        />
        <Message text="Ahoj jak se máš ?" />
        <Message
          text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička."
          received={{
            uid: "",
            displayName: "John Alepskij Lol",
            img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
            email: "david.kristek05@gmail.com",
            key: ""
          }}
        />
        <Message text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička." />
        <Message text="Ahoj jak se máš ?" />
        <Message
          text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička."
          received={{
            uid: "",
            displayName: "John Alepskij Lol",
            img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
            email: "david.kristek05@gmail.com",
            key: ""
          }}
        />
        <Message text="Ahoj jak se máš ?" />
        <Message
          text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička."
          received={{
            uid: "",
            displayName: "John Alepskij Lol",
            img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
            email: "david.kristek05@gmail.com",
            key: ""
          }}
        />
        <Message text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička." />
        <Message text="Ahoj jak se máš ?" />
        <Message
          text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička."
          received={{
            uid: "",
            displayName: "John Alepskij Lol",
            img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
            email: "david.kristek05@gmail.com",
            key: ""
          }}
        />
        <Message text="Ahoj jak se máš ?" />

        <Message text="Dobře se mám a co ty jak se daří? Doufám, že dobře no jo vlastne ted musim napsat neco velmi dlouheho. Tak teda jo no. Tak prej jeste delsi. No jo tak ani toto nestaci. Tyblaho to je delka. Tak a poslední větička." />

        <div ref={bottomOfChat}></div>
      </div>
      <form className="w-full h-16 relative">
        <div className="absolute bottom-0 flex gap-x-4  inset-x-0 px-10">
          {/* pri psani prodlouzeni inputu */}
          <input
            type="text"
            className="input w-[85%]"
            placeholder="Napište @JohnDoe ..."
          />
          <MdSend className="icon" />
          <MdAddPhotoAlternate className="icon" />
          <AiOutlinePlusCircle className="icon" />
        </div>
      </form>
      </>
  );
}
export default withProtected(Chat);
