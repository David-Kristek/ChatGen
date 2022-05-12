import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AddContact from "../components/AddContact";
import AppContainer from "../components/AppContainer";
import CreateGroup from "../components/CreateGroup";

function add_chat() {
  return (
    <div className="mt-36 pl-[10%]">
      <AddContact />
      <CreateGroup />
    </div>
  );
}
export default add_chat;
export const getServerSideProps = async (ctx) => {
  const ss = await getSession(ctx);
  if (!ss)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  return {
    props : {
      
    }
  }
};
