import '../styles/globals.css'
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
// https://github.com/mariesta/nextjs-auth-with-firebase/blob/main/pages/sign_up.jsx
// https://github.com/LogicismX/fullstack-chatapp
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
     </Layout>
  );
}

