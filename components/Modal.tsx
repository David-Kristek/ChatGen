import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  closeModal: () => void;
  modal: boolean;
  children: React.ReactNode;
}

export default function Modal({ closeModal, modal, children }: Props) {
  const dropIn = {
    hidden: {
      y: "-50vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
    },
    exit: {
      y: "-50vh",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={closeModal}
        className="absolute h-full w-full top-0 left-0 bg-[#0000008d] grid place-items-center pb-[15vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-[90%] md:w-[600px] h-[75%] md:h-[50%] bg-[#111111] overflow-auto rounded-2xl shadow-yellow-50 shadow-sm p-10"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
