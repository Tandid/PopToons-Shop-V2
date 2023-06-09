// @ts-nocheck

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider, useSession } from "next-auth/react"; //Helps with next-auth. Allows us to have session in all other pages
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

// TODO: - dashboard css, github, possibly add stripe payment
// FIXME: - Delete product/user, Use AWS S3 to store images, fix search page refresh
const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true} options={undefined}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
};

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <BeatLoader size={10} color={"#000"} loading={true}></BeatLoader>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}
export default App;
