import React from "react";

export default function Logo() {
  return (
    <div className="flex justify-center items-center pr-7">
      <img src="/chatgen.png" alt="logo" className="h-[75px] w-[106px ]" />
      <h1 className="text-lightgreen text-3xl font-mono text">ChatGen</h1>
    </div>
  );
}
