import React from "react";
import Contact from "./Contact";

export default function ContactList() {
  return (
    <div className="mt-10">
      <Contact
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
      />
      
    </div>
  );
}
