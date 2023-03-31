import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; //Helps with next-auth. Allows us to have session in all other pages
import { StoreProvider } from "../utils/Store";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />;
      </StoreProvider>
    </SessionProvider>
  );
};

export default App;
