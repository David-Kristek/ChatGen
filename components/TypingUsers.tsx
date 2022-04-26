import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import {
  Message,
  useIsUserTypingSubscription,
  User,
} from "../graphql/generated/schema";
import Timeout from "timeout-refresh";

export default function TypingUsers({
  lastMessage,
}: {
  lastMessage?: Message;
}) {
  const [typingUsers, setTypingUsers] = useState<
    { timeOut: any; user: User }[]
  >([]);
  const router = useRouter();
  const { data: auth } = useSession();
  const { chatId } = router.query;
  const { data } = useIsUserTypingSubscription({
    variables: { chatId: String(chatId) },
    onSubscriptionData: ({ subscriptionData }) => {
      const user = subscriptionData.data?.isUserTyping;
      if (user?._id === auth?.userId || !user) return;
      const userIsTyping = typingUsers.find(
        (userW) => userW.user._id === user?._id
      );
      if (userIsTyping) {
        userIsTyping.timeOut.refresh();
        return;
      }
      const to = Timeout.once(3000,  () => {
        setTypingUsers((cur) =>
          cur.filter((userW) => userW.user._id !== user?._id)
        );
      });

      setTypingUsers((cur) => [...cur, { user, timeOut: to }]);
    },
  });
  useEffect(() => {
    if (!lastMessage) return;
    setTypingUsers((cur) =>
      cur.filter((userW) => userW.user._id !== lastMessage.sendFrom._id)
    );
  }, [lastMessage]);

  return (
    <>
      {typingUsers.map((user) => (
        <p className="text-white pl-[5%] flex gap-x-3 font-semibold">
          @{user.user.name} píše
          <PulseLoader color="white" speedMultiplier={0.5} size={8} />
        </p>
      ))}
    </>
  );
}
