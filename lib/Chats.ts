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
  orderBy,
  FieldValue,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../context/AuthContext";
import { db } from "../firebaseconfig";

export type Chat = {
  title: string;
  id: string;
  members: DocumentReference<User>[];
  direct: boolean;
};
export type Message = {
  body: string;
  sendFrom: User;
  timestamp?: FieldValue;
  id: string;
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

export const useGetMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!chatId) return;
    console.log("running");

    console.log(chatId, "chatid");

    const msgCollection = query(
      collection(db, "chats", chatId + "", "messages"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(msgCollection, (docs) => {
      var msg: Message[] = [];
      let newMsgs = true;
      docs.forEach(async (document) => {
        const user = await getDoc(document.data().sendFrom);
        const msg = {
          ...(document.data() as Message),
          id: document.id,
          sendFrom: { ...(user.data() as User), uid: user.id } as User,
        };
        setMessages((cur) => (newMsgs ? [msg] : [...cur, msg])); 
        newMsgs = false;
      });
    });
    return () => unsub();
  }, [router]);
  return [messages] as const;
};

export const sendChatMessage = async (
  body: string,
  chatId: string,
  userId: string
) => {
  if (!body) return;
  await addDoc(collection(db, "chats", chatId, "messages"), {
    timestamp: serverTimestamp(),
    sendFrom: doc(db, "users", userId),
    body,
  });
};
