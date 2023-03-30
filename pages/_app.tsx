import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../utils/Store";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  );
};

export default App;
