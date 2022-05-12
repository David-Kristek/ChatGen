import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Modal from "./Modal";
import { MdSend } from "react-icons/md";

export default function CreateGroup() {
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {modal && (
        <Modal closeModal={closeModal} modal={modal}>
          <h2 className="text-2xl text-gray-300 mb-5">Pozvěte své kontakty</h2>
          <div className="grid grid-cols-2 w-full text-gray-400 text-xl">
            <p>David Křístek</p>
            <MdSend className="icon ml-auto" onClick={onSubmit} />

            <p>John Doe</p>
            <MdSend className="icon ml-auto" onClick={onSubmit} />
          </div>
        </Modal>
      )}
      <h1 className="heading mt-36">Vytvořte novou skupinu</h1>
      <form className="pt-4" onSubmit={onSubmit}>
        <input
          type="text"
          className="input  w-1/4"
          placeholder="Název skupiny"
        />
        <button className="btn">Vyberte profilovou fotku</button>
        <button
          className={`btn ${modal && "pointer-events-none"}`}
          onClick={openModal}
        >
          Pozvěte své kontakty{" "}
        </button>
        <button className="btn bg-darkgreen text-white ml-[calc(25%-88px)]">
          Potvrdit
        </button>
      </form>
    </>
  );
}
