import { createContext, useState } from "react";
import Adress from "@/types/adress";

export const Context = createContext<any>(null);

export function AdressesProvider({ children }: any) {
  const [geoLocTo, setGeoLocTo] = useState("");
  const [geoLocFrom, setGeoLocFrom] = useState("");
  const [geoJson, setGeoJson] = useState();
  const [adressTo, setAdressTo] = useState<Adress>();
  const [adressFrom, setAdressFrom] = useState<Adress>();
  return (
    <Context.Provider
      value={{
        geoLocTo,
        setGeoLocTo,
        geoLocFrom,
        setGeoLocFrom,
        geoJson,
        setGeoJson,
        adressTo,
        setAdressTo,
        adressFrom,
        setAdressFrom,
      }}
    >
      {children}
    </Context.Provider>
  );
}
