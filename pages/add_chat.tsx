import React, { useEffect, useState } from "react";
import AddContact from "../components/AddContact";
import AppContainer from "../components/AppContainer";

function add_chat() {

  return (
      <div className="mt-36 pl-[10%]">
        <AddContact />
        <h1 className="heading mt-36">Vytvořte novou skupinu</h1>
        <form className="pt-4">
          <input
            type="text"
            className="input  w-1/4"
            placeholder="Název skupiny"
          />
          <button className="btn">Vyberte profilovou fotku</button>
          <button className="btn">Pozvěte své kontakty </button>
          <button className="btn bg-darkgreen text-white ml-[calc(25%-88px)]">
            Potvrdit
          </button>
        </form>
      </div>
  );
}
export default add_chat;
