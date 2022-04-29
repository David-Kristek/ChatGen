import React from "react";
import { User } from "../graphql/generated/schema";
import FirstMessage from "./FirstMessage";
// import { User } from "../Models/Types";

interface Props {
  received?: User;
  body: any;
}

export default function Message({ received, body }: Props) {
  // u last precteno pred minutami
  return (
    <div
      className={`w-full px-[5%] flex relative mb-5 cursor-pointer ${
        received ? "justify-start" : "justify-end"
      }`}
    >
      {received && (
        <img
          src={received.image}
          alt="Profile image"
          className="absolute left-[2%] bottom-0 h-8 rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      {body?.text ? (
        <div
          className={`text-white rounded-lg py-2 px-4 max-w-[50%] transition-all  ${
            received
              ? "bg-bluegreen rounded-bl-none hover:bg-[#265e4d] "
              : "bg-lightgreen rounded-br-none hover:bg-green-800"
          }`}
        >
          {body?.text}
        </div>
      ) : body?.msg === "first" ? (
        <FirstMessage received={received} />
      ) : (
        <>{JSON.stringify(body)}</>
      )}
    </div>
  );
}
