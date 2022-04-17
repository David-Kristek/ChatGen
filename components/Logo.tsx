import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex justify-center items-center pr-7">
      <Image src="/chatgen.png" alt="logo" width={106} height={75} />
      <h1 className="text-lightgreen text-3xl font-mono text">ChatGen</h1>
    </div>
  );
}
