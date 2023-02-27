import { Context } from "@/context/adresses";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Map from "@/components/map";
import TripDetails from "@/components/TripDetails";
const Trip = () => {
  const {
    geoJson,
    setGeoJson,
    setGeoLocFrom,
    geoLocFrom,
    setGeoLocTo,
    geoLocTo,
    setAdressTo,
    adressTo,
    setAdressFrom,
    adressFrom,
    tripHistory,
    setTripHistory,
  } = useContext(Context);

  useEffect(() => {
    if (!geoLocFrom && !geoLocTo) router.push("/");
  }, []);

  const router = useRouter();

  const goToHome = () => {
    setTripHistory([
      { adressTo: adressTo, adressFrom: adressFrom },
      ...tripHistory,
    ]);
    setGeoLocFrom(null);
    setGeoLocTo(null);
    setAdressTo(null);
    setAdressFrom(null);
    setGeoJson(null);
    router.push("/");
  };

  return (
    <>
      {geoJson && <TripDetails />}
      {geoLocFrom && <Map />}
      <button onClick={goToHome}>Back to homepage!</button>
    </>
  );
};

export default Trip;
