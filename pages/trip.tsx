import { Context } from "@/context/adresses";
import { useContext } from "react";
import Map from "@/components/map";
import TripDetails from "@/components/TripDetails";
const Trip = () => {
  const { geoJson } = useContext(Context);
  return (
    <>
      {geoJson && <TripDetails />}
      <Map />
    </>
  );
};

export default Trip;
