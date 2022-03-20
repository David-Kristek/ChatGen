import React from "react";
import { FiMoreVertical } from "react-icons/fi";

interface menu {
  logout?: () => {};
  size?: number;
  className?: "";
}

export default function Menu({ logout, size, className }: any) {
  return (
    <FiMoreVertical
      onClick={logout}
      className={`text-white text-${size}xl  p-1 cursor-pointer bg-darkgreen transition-all rounded-xl hover:bg-green-800 ${className}`}
    />
  );
}
