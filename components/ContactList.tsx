import React from "react";
import { useAuth } from "../context/AuthContext";
import { getUserFromReference, useGetChats } from "../lib/Chats";
import Contact from "./Contact";

export default function ContactList() {
  const auth = useAuth();
  const [chats] = useGetChats(auth.user?.uid || "");

  return (
    <div className="mt-10">
      {chats &&
        chats.map((chats, index) => {
          let chatId; 
          let user;
          // if (chats.direct) {
          chats.members.forEach((member) => {
            if (member.id !== auth.user?.uid) {
              user = member;
            }
          });
          // presunot do contactu vsechno
          // }
          return <Contact user={user} chatId={chats.id} lastMessage="Ahoj jak se máš ?" key={index}/>;
        })}
      {/* <Contact
        user={{
          uid: "",
          displayName: "David Kristek",
          img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
          email: "david.kristek05@gmail.com",
        }}
        active
        lastMessage="Ahoj jak se máš ?"
      />
      <Contact
        user={{
          uid: "",
          displayName: "John Alepskij Lol",
          img: "https://lh3.googleusercontent.com/a/AATXAJz4sFHG7AaYOKlstNyvAdIh5Gw5tBgQTt-FP3b2=s96-c",
          email: "david.kristek05@gmail.com",
        }}
        lastMessage="Ahoj jak se máš ?"
      /> */}
    </div>
  );
}
