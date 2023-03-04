import React, { createContext, useState } from "react";
import Address from "@/types/address";
import { resultsItem } from "@/types/apires";
import TripHistory from "@/types/tripHistory";

export type GlobalContext = {
  geoLocTo: resultsItem;
  setGeoLocTo: React.Dispatch<React.SetStateAction<resultsItem>>;
  geoLocFrom: resultsItem;
  setGeoLocFrom: React.Dispatch<React.SetStateAction<resultsItem>>;
  geoJson;
  setGeoJson;
  addressTo: Address;
  setAddressTo: React.Dispatch<React.SetStateAction<Address>>;
  addressFrom: Address;
  setAddressFrom: React.Dispatch<React.SetStateAction<Address>>;
  tripHistory: TripHistory;
  setTripHistory: React.Dispatch<React.SetStateAction<TripHistory>>;
};

export const Context = createContext<GlobalContext>(null);

export function AddressesProvider({ children }: any) {
  const [geoLocTo, setGeoLocTo] = useState<resultsItem>();
  const [geoLocFrom, setGeoLocFrom] = useState<resultsItem>();
  const [geoJson, setGeoJson] = useState();
  const [addressTo, setAddressTo] = useState<Address>(null);
  const [addressFrom, setAddressFrom] = useState<Address>(null);
  const [tripHistory, setTripHistory] = useState<TripHistory>([]);

  return (
    <Context.Provider
      value={{
        geoLocTo,
        setGeoLocTo,
        geoLocFrom,
        setGeoLocFrom,
        geoJson,
        setGeoJson,
        addressTo,
        setAddressTo,
        addressFrom,
        setAddressFrom,
        tripHistory,
        setTripHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
}
