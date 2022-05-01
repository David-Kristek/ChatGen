import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Message, User } from "../graphql/generated/schema";
import moment from "moment";
interface Props {
  lastMessage: Message;
  members: { member: User; lastActive: Date }[];
}

export default function ReadBy({ lastMessage, members }: Props) {
  const { data: auth } = useSession();
  const [hover, setHover] = useState(false);
  const timeDifference = useCallback(
    (date: Date) => {
      const time = new Date(date).getTime();
      const difference = new Date().getTime() - time;
      const diff = moment.duration(difference);
      const days = diff.days();
      const hours = diff.hours();
      const minutes = diff.minutes();
      const seconds = diff.seconds();

      if (days) return `zobrazil před ${days} dny`;
      if (hours) return `zobrazil před ${hours} hodinami a ${minutes} minutami`;
      if (minutes) return `zobrazil před ${minutes} minutami`;
      return `zobrazil před právě teď`;
    },
    [hover]
  );
  if (!lastMessage) return <></>;
  return (
    <div
      className={`my-4 cursor-pointer flex px-[5%] z-20 relative ${
        lastMessage.sendFrom._id === auth?.userId
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {members.map((member, index) => {
        if (
          member.member._id === auth?.userId ||
          lastMessage.sendFrom._id === member.member._id
        )
          return <div key={index}></div>;
        if (
          new Date(member.lastActive).getTime() + 1000 >
          new Date(lastMessage.createdAt).getTime()
        ) {
          return (
            <div
              className="relative group text-white z-20 mx-3"
              onMouseEnter={() => setHover((hover) => !hover)}
              key={index}
            >
              <Image
                src={member.member.image}
                height={30}
                width={30}
                className=" rounded-full  border-black border-solid "
              />
              <div
                className={`hidden group-hover:block absolute bg-black text-white rounded-md p-2 bottom-full whitespace-nowrap ${
                  lastMessage.sendFrom._id === auth?.userId ? "right-0" : ""
                } z-20`}
              >
                {member.member.name}
                {" " + timeDifference(member.lastActive)}
              </div>
            </div>
          );
        }
        return (
          // <div className="text-white" key={index}>
          //   {member.member.name} neprecteno
          // </div>
          <div key={index}></div>
        );
      })}
    </div>
  );
}
