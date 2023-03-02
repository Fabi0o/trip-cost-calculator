import React, { createContext, useState } from "react";
import Adress from "@/types/adress";
import { resultsItem } from "@/types/apires";
import TripHistory from "@/types/tripHistory";

export type GlobalContext = {
  geoLocTo: resultsItem;
  setGeoLocTo: React.Dispatch<React.SetStateAction<resultsItem>>;
  geoLocFrom: resultsItem;
  setGeoLocFrom: React.Dispatch<React.SetStateAction<resultsItem>>;
  geoJson;
  setGeoJson;
  adressTo: Adress;
  setAdressTo: React.Dispatch<React.SetStateAction<Adress>>;
  adressFrom: Adress;
  setAdressFrom: React.Dispatch<React.SetStateAction<Adress>>;
  tripHistory: TripHistory;
  setTripHistory: React.Dispatch<React.SetStateAction<TripHistory>>;
};

export const Context = createContext<GlobalContext>(null);

export function AdressesProvider({ children }: any) {
  const [geoLocTo, setGeoLocTo] = useState<resultsItem>();
  const [geoLocFrom, setGeoLocFrom] = useState<resultsItem>();
  const [geoJson, setGeoJson] = useState();
  const [adressTo, setAdressTo] = useState<Adress>(null);
  const [adressFrom, setAdressFrom] = useState<Adress>(null);
  const [tripHistory, setTripHistory] = useState<TripHistory>(null);

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
        tripHistory,
        setTripHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
}
