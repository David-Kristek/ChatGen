import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getServerSideProps } from ".";
import LoginWith from "../components/LoginWith";
import Logo from "../components/Logo";
function login() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(status, status === "authenticated");
    if (status === "authenticated") {
      router.push("/");
      console.log("pushed");
      
    }
  }, []);
  return (
    <div className="bg-blackgreen min-h-[100vh] overflow-auto">
      <section className="w-1/4 m-auto bg-darkgreen shadow-sm shadow-lightgreen rounded-xl	mt-[10%] py-5 px-5">
        <Logo />
        <div className="text-xl text-lightgreen mt-14 mx-[10%]">
          <LoginWith name="google" />
          <LoginWith name="github" />
        </div>
      </section>
    </div>
  );
}
export default login;
export const getServerSideProps = async (ctx) => {
  const session = await  getSession(ctx); 
  return {
    props: {}
  }
}