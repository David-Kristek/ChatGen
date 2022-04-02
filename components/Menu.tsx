import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

type MenuItem = {
  callback?: () => any;
  title: string;
};
interface Props {
  size?: number;
  className?: string;
  items?: MenuItem[];
}

export default function Menu({ size, className, items }: Props) {
  const [opended, setOpended] = useState(false);
  const [onMenu, setOnMenu] = useState(false);
  const open = () => {
    setOpended(true);
  };
  const close = () => {
    console.log(onMenu);

    setOpended(false || onMenu);
  };
  const toggle = () => {
    setOpended((cur) => !cur);
  };
  return (
    <div className={`${className} ${opended && "opacity-100"}`}>
      <div className="relative">
        <button onClick={toggle} onBlur={close}>
          <FiMoreVertical
            className={`text-white text-${size}xl  p-1 cursor-pointer bg-darkgreen transition-all rounded-xl hover:bg-green-800`}
          />
        </button>
        <ul
          className={`absolute top-full right-full bg-black text-gray-300  z-30 rounded-xl shadow-black shadow-lg cursor-pointer w-48 ${
            !opended && "hidden"
          }`}
        >
          {items &&
            items.map((item, index) => (
              <li
                className="py-2 px-7 hover:text-white border-2 border-gray-800 hover:bg-darkgreen transition-all hover text-sm"
                onClick={() => {
                  close();
                  if (item.callback) item.callback();
                }}
                onMouseEnter={() => {
                  setOnMenu(true);
                }}
                onMouseLeave={() => {
                  console.log("leave");
                  setOnMenu(false);
                }}
                key={index}
              >
                {item.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
