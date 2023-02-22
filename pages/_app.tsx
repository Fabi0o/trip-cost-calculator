import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdressesProvider } from "@/context/adresses";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdressesProvider>
      <Component {...pageProps} />
    </AdressesProvider>
  );
}
