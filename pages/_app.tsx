import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import AppContainer from "../components/AppContainer";
import { SessionProvider, useSession } from "next-auth/react";
import PubSub from "pubsub-js";

// https://github.com/mariesta/nextjs-auth-with-firebase/blob/main/pages/sign_up.jsx
// https://github.com/LogicismX/fullstack-chatapp
// https://github.com/Chensokheng/next-firebase-boilerplate/blob/main/src/hook/auth.js
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { useApollo } from "../lib/apolloClient";

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
  const client = useApollo(pageProps.initialApolloState);
  if (status === "authenticated") {
    // @ts-ignore
    if (window.Cypress) {
      window.PubSub = PubSub;
    }
    return (
      <ApolloProvider client={client}>
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
