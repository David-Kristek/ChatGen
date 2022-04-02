import React, { useEffect, useState } from "react";
import { BiPlusCircle, BiSearchAlt2 } from "react-icons/bi";
import { useAddContact } from "../lib/Chats";
import axios from "axios";
import { User } from "../Models/Types";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function AddContact() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  // const [results, setResults] = useState<User[] | null | "notFound">();
  const searchUserQuery = gql`
    query searchForUser($search: String!) {
      searchForUser(queryString: $search) {
        name
        email
        image
      }
    }
  `;
  const [loadQuery, { loading, data: results }] = useLazyQuery(
    searchUserQuery,
    {
      variables: { search },
    }
  );
  useEffect(() => {
    if (search && search.length > 4) {
      loadQuery();
    }
  }, [search]);

  return (
    <>
      <h1 className="heading">Najděte nové kontakty</h1>
      <div className="flex items-center pt-4 gap-x-2 relative">
        <input
          type="text"
          className="input  w-1/4"
          placeholder="Jméno nebo email uživatele"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          autoComplete="off"
        />
        <BiSearchAlt2 className="icon" />
        <ul className="absolute w-1/4 bg-black text-white top-14 rounded-b-lg ">
          {results && !loading ? (
            results === "notFound" ? (
              <li className="px-5 py-2 text-lg hover:bg-darkgreen">
                User not found 😥
              </li>
            ) : (
              results.searchForUser.map((user: User) => (
                <li
                  className="flex justify-between px-5 py-2 text-lg hover:bg-darkgreen cursor-pointer"
                  title={"#" + user?.email}
                >
                  <span className="flex items-center gap-x-2">
                    <img
                      src={user?.image}
                      alt="Profile image"
                      className="h-[30px] rounded-full"
                    />
                    <div>{user?.name}</div>
                  </span>
                  <BiPlusCircle className="icon text-2xl" onClick={() => {}} />
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
