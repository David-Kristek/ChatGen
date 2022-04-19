import React, { useMemo } from "react";
import format from "date-format";

interface Props {
  time: string;
  prevTime?: string;
}

export default function Time({ time, prevTime }: Props) {
  // format("hh:mm", new Date(message.createdAt)
  const days = [
    "Monday",
    "Tuesday ",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const showTime: string | undefined = useMemo(() => {
    const dTime = new Date(time);
    const dPrevTime = prevTime ? new Date(prevTime) : null;
    console.log(dPrevTime && dTime.getTime() - dPrevTime.getTime(), "minus");

    if (
      !dPrevTime ||
      dTime.getTime() - (dPrevTime ? dPrevTime.getTime() : 0) > 360000
    ) {
      return dTime.getDate() === new Date().getDate()
        ? format("hh:mm", dTime )
        : dTime.getTime() - (dPrevTime?.getTime() ?? new Date().getTime()) >
          604800000
        ? format("hh:mm dd.MM.", dTime)
        : days[dTime.getDay()] + format(` hh:mm`, dTime);
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
