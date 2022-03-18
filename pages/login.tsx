import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import LoginWith from "../components/LoginWith";

export default function login() {
  return (
    <main className="bg-blackgreen min-h-[100vh] overflow-auto">
      <section className="w-1/4 m-auto bg-darkgreen shadow-sm shadow-green rounded-xl	mt-[10%] py-5 px-5">
        <div className="flex justify-center items-center">
          <img src="chatgen.png" alt="logo" className="h-[75px] w-[106px ]" />
          <h1 className="text-green text-3xl font-mono text">ChatGen</h1>
        </div>
        <div className="text-xl text-green mt-14 mx-[10%]">
          <LoginWith name="google" provider={GoogleAuthProvider}/>
          <LoginWith name="github" provider={GithubAuthProvider} />
        </div>
      </section>
    </main>
  );
}
