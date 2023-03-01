import { Context } from "@/context/adresses";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Map from "@/components/Map";
import TripDetails from "@/components/TripDetails";
import styles from "@/styles/Trip.module.css";
import Adress from "@/types/adress";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});
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

  const ref = useRef(null);

  useEffect(() => {
    if (!geoLocFrom && !geoLocTo) router.push("/");
  }, []);

  const router = useRouter();

  const goToHome = () => {
    const tripStart: Adress = {
      city: geoLocFrom.address.localName,
      streetAdress: geoLocFrom.address.streetName,
      streetNumber: geoLocFrom.address.streetNumber
        ? Number(geoLocFrom.address.streetNumber)
        : 0,
      country: geoLocFrom.address.country,
    };
    const tripEnd: Adress = {
      city: geoLocTo.address.localName,
      streetAdress: geoLocTo.address.streetName,
      streetNumber: geoLocTo.address.streetNumber
        ? Number(geoLocTo.address.streetNumber)
        : 0,
      country: geoLocTo.address.country,
    };
    setTripHistory([
      { adressTo: tripEnd, adressFrom: tripStart },
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
      <div ref={ref}>{geoJson && <TripDetails />}</div>
      {geoLocFrom && <Map />}
      <button onClick={goToHome} className={styles.button}>
        Back to homepage!
      </button>

      <GeneratePDF html={ref} className={styles.button} />
    </>
  );
};

export default Trip;
