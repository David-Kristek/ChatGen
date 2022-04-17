import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import AppContainer from "../components/AppContainer";
import { SessionProvider, useSession } from "next-auth/react";

// https://github.com/mariesta/nextjs-auth-with-firebase/blob/main/pages/sign_up.jsx
// https://github.com/LogicismX/fullstack-chatapp
// https://github.com/Chensokheng/next-firebase-boilerplate/blob/main/src/hook/auth.js
import { ApolloProvider } from "@apollo/client";
import appoloClient from "../lib/apolloClient";
import { useRouter } from "next/router";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <App Component={Component} pageProps={pageProps} router={router} />
      </Layout>
    </SessionProvider>
  );
}
function Providers({ children }: any) {
  return;
}

function App({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();
  console.log(status);
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <ApolloProvider client={appoloClient}>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ApolloProvider>
    );
  } else if (status === "unauthenticated") {
    return <Component {...pageProps} />;
  }
  return null;
}
