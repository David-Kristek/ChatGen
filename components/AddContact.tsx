import React, { useEffect, useState } from "react";
import { BiPlusCircle, BiSearchAlt2 } from "react-icons/bi";
import { collection, FieldPath, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useAuth, User } from "../context/AuthContext";
import { useAddContact } from "../lib/Chats";
export default function AddContact() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[] | null | "notFound">();
  const [loading, startAddingContact] = useAddContact();
  const auth = useAuth();
  useEffect(() => {
    setResults(null);
    setSearch((string) => (string ? "#" + string.replace("#", "") : ""));
    if (search.length <= 3) return;
    const asyncFunction = async () => {
      // do jineho souboru
      console.log("running");
      const searchString = search.replace("#", "");
      const usersCollection = collection(db, "users");
      const q = query(
        usersCollection,
        where("key", ">=", searchString),
        where("key", "<=", searchString + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      var usersArr: User[] = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), uid: doc.id } as User);
      });
      //   console.log(results);
      console.log(usersArr);
      setResults(usersArr.length > 0 ? usersArr : "notFound");
    };
    asyncFunction();
  }, [search]);
  return (
    <>
      <h1 className="heading">Najděte nové kontakty</h1>
      <div className="flex items-center pt-4 gap-x-2 relative">
        <input
          type="text"
          className="input  w-1/4"
          placeholder="Číslo uživatele (#abc123)"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <BiSearchAlt2 className="icon" />
        <ul className="absolute w-1/4 bg-black text-white top-14 rounded-b-lg ">
          {results ? (
            results === "notFound" ? (
              <li className="px-5 py-2 text-lg hover:bg-darkgreen">
                User not found 😥
              </li>
            ) : (
              results.map((user) => (
                <li
                  className="flex justify-between px-5 py-2 text-lg hover:bg-darkgreen cursor-pointer"
                  title={"#" + user?.key}
                >
                  <span className="flex items-center gap-x-2">
                    <img
                      src={user?.img}
                      alt="Profile image"
                      className="h-[30px] rounded-full"
                    />
                    <div>{user?.displayName}</div>
                  </span>
                  <BiPlusCircle
                    className="icon text-2xl"
                    onClick={() =>
                      startAddingContact({
                        userId: auth.user?.uid || "",
                        contactId: user?.uid || "",
                      })
                    }
                  />
                </li>
              ))
            )
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
}
