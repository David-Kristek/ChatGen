import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
  getDoc,
  QuerySnapshot,
  DocumentReference,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "../context/AuthContext";
import { db } from "../firebaseconfig";

export type Chat = {
  title: string;
  id: string;
  members: DocumentReference<User>[];
  direct: boolean;
};

interface addContactProps {
  userId: string;
  contactId: string;
}
export const useAddContact = () => {
  const [loading, setLoading] = useState(false);

  const trigger = async ({ userId, contactId }: addContactProps) => {
    setLoading(true);
    await addDoc(collection(db, "chats"), {
      direct: true,
      timestamp: serverTimestamp(),
      members: [doc(db, "users", userId), doc(db, "users", contactId)],
    });
    setLoading(false);
  };

  return [loading, trigger] as const;
};

export const useGetChats = (userId: string) => {
  const [chats, setChats] = useState<Chat[]>();
  const getChats = async (docs: QueryDocumentSnapshot<DocumentData>) => {
    const data = docs.data();
    const members = [];
    for (let index = 0; index < data.members.length; index++) {
      const member = await getUserFromReference(data.members[index]);
      members.push(member);
    }
    return { ...(docs.data() as Chat), id: docs.id, members };
  };
  useEffect(() => {
    console.log("renewing");
    
    const chatsQuery = query(
      collection(db, "chats"),
      where("members", "array-contains", doc(db, "/users/" + userId))
      // where("direct", "==", true)
    );
    const unsub = onSnapshot(chatsQuery, (docs) => {
      setChats(undefined);
      docs.forEach((document) => {
        // getChats(document).then((res) => {
        //   if (res) setChats((cur) => (cur ? [...cur, res] : [res]));
        // });
        setChats((cur) =>
          cur
            ? [...cur, { ...(document.data() as Chat), id: document.id }]
            : [{ ...(document.data() as Chat), id: document.id }]
        );
      });
    });
    return () => unsub();
  }, []);
  return [chats] as const;
};

export const getUserFromReference = async (
  userReference: DocumentReference<User>
) => {
  const user = (await getDoc(userReference)).data() as User;
  return user;
};
