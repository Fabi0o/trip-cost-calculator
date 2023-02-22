import { createContext, useState } from "react";

export const Context = createContext<any>(null);

export function AdressesProvider({ children }: any) {
  const [adressTo, setAdressTo] = useState("");
  const [adressFrom, setAdressFrom] = useState("");
  return (
    <Context.Provider
      value={{ adressTo, setAdressTo, adressFrom, setAdressFrom }}
    >
      {children}
    </Context.Provider>
  );
}
