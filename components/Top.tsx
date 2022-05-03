import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { contactSelecter } from "../lib/chatHelper";
import Image from "next/image";
import { Chat } from "../graphql/generated/schema";

interface Props {
    chat?: Chat; 

}

export default function Top({chat} : Props) {
  const {data : auth } = useSession();  

  const contact = useMemo(() => {
    if (!chat) return;
    return contactSelecter(chat, String(auth?.userId));
  }, [chat]);

  return (
    <div className="flex-center justify-start pl-[6%] pt-5 pb-3">
      {contact?.image && (
        <Image
          src={contact.image}
          alt="Profile image"
          className=" rounded-full"
          height={63}
          width={63}
        />
      )}
      <div className="text-`2`xl text-white  ml-3">
        <span>{contact?.name}</span>
        <span className="flex-center justify-end">
          <div className="h-3 w-3 mr-1 bg-green-500 rounded-full" />
          <div className="text-xs text-[#ADADAD] ">Právě aktivní</div>
        </span>
      </div>
    </div>
  );
}
