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
      className={`w-full xl:px-[5%] px-12  flex relative mb-5 cursor-pointer ${
        received ? "justify-start" : "justify-end"
      }`}
      cy-data="message"
    >
      {received && (
        <img
          src={received.image}
          alt="Profile image"
          className="absolute 2xl:left-[2%] xl:left-3 left-2  bottom-0 h-8 rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      {body?.text ? (
        <div
          className={`sm:text-base xs:text-[15px] text-sm  text-white rounded-lg py-2 sm:px-4 px-2 xl:max-w-[50%] sm:max-w-[65%] xs:max-w-[75%] max-w-[85%] transition-all  ${
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
