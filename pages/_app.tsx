import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { auth } from "../firebaseconfig";
import {
  AuthContextInterface,
  AuthContextProvider,
  useAuth,
} from "../context/AuthContext";
import AppContainer from "../components/AppContainer";
// https://github.com/mariesta/nextjs-auth-with-firebase/blob/main/pages/sign_up.jsx
// https://github.com/LogicismX/fullstack-chatapp
// https://github.com/Chensokheng/next-firebase-boilerplate/blob/main/src/hook/auth.js
export interface PageProps {
  auth: AuthContextInterface;
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <Providers>
        <App Component={Component} pageProps={pageProps} router={router}/>
      </Providers>
    </Layout>
  );
}
function Providers({ children }: any) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

function App({ Component, pageProps }: AppProps) {
  const auths = useAuth();
  console.log(auths, "authssss");
  return (
    <>
      {auth.currentUser ? (
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
