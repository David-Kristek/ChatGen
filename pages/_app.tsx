import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { auth } from "../firebaseconfig";
import {
  AuthContextInterface,
  AuthContextProvider,
} from "../context/AuthContext";
// https://github.com/mariesta/nextjs-auth-with-firebase/blob/main/pages/sign_up.jsx
// https://github.com/LogicismX/fullstack-chatapp
// https://github.com/Chensokheng/next-firebase-boilerplate/blob/main/src/hook/auth.js
export interface PageProps {
  auth: AuthContextInterface;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Layout>
  );
}
