import { createContext, useState } from "react";

export const Context = createContext<any>(null);

export function AdressesProvider({ children }: any) {
  const [geoLocTo, setGeoLocTo] = useState("");
  const [geoLocFrom, setGeoLocFrom] = useState("");
  return (
    <Context.Provider
      value={{ geoLocTo, setGeoLocTo, geoLocFrom, setGeoLocFrom }}
    >
      {children}
    </Context.Provider>
  );
}
