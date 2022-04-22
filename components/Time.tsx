import React, { useMemo } from "react";
import format from "date-format";
import { formatDate } from "../lib/chatHelper";

interface Props {
  time: string;
  prevTime?: string;
}

export default function Time({ time, prevTime }: Props) {
  // format("hh:mm", new Date(message.createdAt)

  const showTime: string | undefined = useMemo(() => {
    const dTime = new Date(time);
    const dPrevTime = prevTime ? new Date(prevTime) : null;

    if (
      !dPrevTime ||
      dTime.getTime() - (dPrevTime ? dPrevTime.getTime() : 0) > 360000
    ) {
      return formatDate(dTime, dPrevTime ?? undefined);
    }
    return;
  }, [time]);
  //   if()
  return (
    <>
      {showTime && (
        <div className="text-gray-300 text-center my-3 text-xs">{showTime}</div>
      )}
    </>
  );
}
