import React from "react";

import { useAuth } from "../context/AuthContext";
interface Props {
  name: string;
  provider: any;
}

export default function LoginWith({ name, provider }: Props) {
  const { signin } = useAuth();

  return (
    <div className="flex-center justify-between bg-white px-3 py-2 rounded-xl mt-5 cursor-pointer transition hover"  onClick={() => signin(provider)}>
      <img src={`${name}.png`} alt="logo" className="h-[30px] w-[30px ]" />
      <label className="text-lg text-black">
        Sign up with {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </div>
  );
}
