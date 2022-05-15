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
            <input type={"checkbox"} className="ml-auto scale-150" />

            <p>John Doe</p>
            <input type={"checkbox"} className="ml-auto scale-150" />
          </div>
        </Modal>
      )}
      <h1 className="heading mt-36">Vytvořte novou skupinu</h1>
      {/* <p className="text-red-600 pt-1">Nepozval jste žádné kontakty!</p> */}
      <form className="pt-4" onSubmit={onSubmit}>
        <input
          type="text"
          className="input  2xl:w-1/4 w-3/4"
          placeholder="Název skupiny"
        />
        <button className="btn">Vyberte profilovou fotku</button>
        <button
          className={`btn ${modal && "pointer-events-none"}`}
          onClick={openModal}
        >
          Pozvěte své kontakty
        </button>
        <button className="btn bg-darkgreen text-white ml-[calc(25%-88px)]">
          Potvrdit
        </button>
      </form>
    </>
  );
}
