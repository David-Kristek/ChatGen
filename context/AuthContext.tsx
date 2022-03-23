import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";

import { auth, db } from "../firebaseconfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export interface AuthContextInterface {
  user: User;
  signin: (providerClass: any) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextInterface>({
  user: null,
  signin: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export type User = {
  uid: string;
  email: string;
  displayName: string;
  img: string;
  key: string;
  friends?: string[];
} | null;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const uid = user.uid;
        const userObj = {
          email: user.email,
          displayName: user.displayName,
          img: auth.currentUser?.photoURL || "",
          // nedomyslene
          key:
            uid[0] +
            uid[uid.length - 1] +
            uid[uid.length - 2] +
            uid[2] +
            uid[1],
        };
        setUser({ ...userObj, uid });
        console.log(auth.currentUser);
        setDoc(doc(db, "users", user.uid), userObj);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signin = (providerClass: any) => {
    const provider = new providerClass();
    return signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = providerClass.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = providerClass.credentialFromError(error);
        // ...
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
