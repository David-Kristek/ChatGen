import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import LoginWith from "../components/LoginWith";
import Logo from "../components/Logo";
import { withPublic } from "../lib/Routes";
function login() {
  return (
    <div className="bg-blackgreen min-h-[100vh] overflow-auto">
      <section className="w-1/4 m-auto bg-darkgreen shadow-sm shadow-lightgreen rounded-xl	mt-[10%] py-5 px-5">
        <Logo />
        <div className="text-xl text-lightgreen mt-14 mx-[10%]">
          <LoginWith name="google" provider={GoogleAuthProvider} />
          <LoginWith name="github" provider={GithubAuthProvider} />
        </div>
      </section>
    </div>
  );
}
export default withPublic(login);
