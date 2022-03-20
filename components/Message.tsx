import React from "react";
import { User } from "../context/AuthContext";

interface Props {
  received?: User;
  text: string;
}

export default function Message({ received, text }: Props) {
  return (
    <div
      className={`w-full px-[5%] flex relative mb-5 ${
        received ? "justify-start" : "justify-end"
      }`}
    >
      {received && (
          <img
            src={received.img}
            alt="Profile image"
            className="absolute left-[2%] bottom-0 h-8 rounded-full"
          />
        )}
      <div
        className={`text-white rounded-lg py-2 px-4 max-w-[50%]  ${
          received
            ? "bg-bluegreen rounded-bl-none"
            : "bg-lightgreen rounded-br-none"
        }`}
      >
        {text}

      </div>
    </div>
  );
}
