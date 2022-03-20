import React from "react";
import HomeContainer from "../components/HomeContainer";
import { BiPlusCircle, BiSearchAlt2 } from "react-icons/bi";
import { withProtected } from "../lib/Routes";
function add_contact() {
  return (
    <HomeContainer>
      <div className="mt-36 pl-[10%]">
        <h1 className="heading">Najděte nové kontakty</h1>
        <form className="flex items-center pt-4 gap-x-2 relative">
          <input
            type="text"
            className="input  w-1/4"
            placeholder="Číslo uživatele (#abc123)"
          />
          <BiSearchAlt2 className="icon" />
          <ul className="absolute w-1/4 bg-black text-white top-14 rounded-b-lg ">
            <li
              className="flex justify-between px-5 py-2 text-lg hover:bg-darkgreen cursor-pointer"
              title="abc123"
            >
              {" "}
              <span> David Křístek</span>{" "}
              <BiPlusCircle className="icon text-2xl" />{" "}
            </li>
            <li
              className="flex justify-between px-5 py-2 text-lg hover:bg-darkgreen cursor-pointer"
              title="abc124"
            >
              {" "}
              <span>
                {" "}
                John Doe
              </span> <BiPlusCircle className="icon text-2xl" />{" "}
            </li>
          </ul>
        </form>
        <h1 className="heading mt-36">Vytvořte novou skupinu</h1>
        <form className="pt-4">
          <input
            type="text"
            className="input  w-1/4"
            placeholder="Název skupiny"
          />
        <button className="btn">Vyberte profilovou fotku</button>
        <button className="btn">Pozvěte své kontakty </button>
        <button className="btn bg-darkgreen text-white ml-[calc(25%-88px)]">Potvrdit</button>
        </form>
      </div>
    </HomeContainer>
  );
}
export default withProtected(add_contact);