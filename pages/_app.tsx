import { SessionProvider, useSession } from "next-auth/react"; //Helps with next-auth. Allows us to have session in all other pages
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
};

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
export default App;
