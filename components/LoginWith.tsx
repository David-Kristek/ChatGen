import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React from "react";

interface Props {
  name: string;
}

export default function LoginWith({ name }: Props) {
  const { data } = useSession();
  return (
    <div
      className="flex-center justify-between bg-white px-3 py-2 rounded-xl mt-5 cursor-pointer transition hover"
      onClick={() => {
        signIn(name);
      }}
    >
      <img src={`${name}.png`} alt="logo" className="h-[30px] w-[30px ]" />
      <label className="text-lg text-black">
        Sign up with {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </div>
  );
}
