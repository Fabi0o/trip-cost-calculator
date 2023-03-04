import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AddressesProvider } from "@/context/addresses";
import "../styles/maps.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AddressesProvider>
      <Component {...pageProps} />
    </AddressesProvider>
  );
}
