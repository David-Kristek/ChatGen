import React, { useEffect, useState } from "react";
import { BiPlusCircle, BiSearchAlt2 } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  useAddContactMutation,
  User,
  useSearchForUserLazyQuery,
} from "../graphql/generated/schema";

export default function AddContact() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const [
    addContact,
    { data: addContactData, error, loading: addContactLoading },
  ] = useAddContactMutation();

  const [loadQuery, { loading, data: results }] = useSearchForUserLazyQuery({
    variables: { search },
  });

  useEffect(() => {
    if (search && search.length > 4) {
      loadQuery();
    }
  }, [search]);
  useEffect(() => {
    if (!addContactData) return;
    // redirect to `chat/${addContactData._id}`
    // push to chats on left
    setSearch("");
  }, [addContactData]);

  return (
    <>
      <h1 className="heading">Najděte nové kontakty</h1>
      <div className="flex items-center pt-4 gap-x-2 relative z-0">
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
              results?.searchForUser?.map((user: User) => (
                <li
                  className="flex justify-between px-5 py-2 text-lg hover:bg-darkgreen cursor-pointer"
                  title={"#" + user?.email}
                >
                  <span className="flex items-center gap-x-2">
                    <img
                      src={user?.image}
                      alt="Profile image"
                      className="h-[30px] rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <div>{user?.name}</div>
                  </span>
                  <BiPlusCircle
                    className="icon text-2xl"
                    onClick={() => {
                      // if (!addContactLoading)
                      addContact({ variables: { addContactId: user._id } });
                    }}
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
