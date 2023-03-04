import { Context } from "@/context/addresses";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Map from "@/components/Map";
import TripDetails from "@/components/TripDetails";
import styles from "@/styles/Trip.module.css";
import Address from "@/types/address";

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
    setAddressTo,
    addressTo,
    setAddressFrom,
    addressFrom,
    tripHistory,
    setTripHistory,
  } = useContext(Context);

  const ref = useRef(null);

  useEffect(() => {
    if (!geoLocFrom && !geoLocTo) router.push("/");
  }, []);

  const router = useRouter();

  const goToHome = () => {
    const tripStart = new Address(
      geoLocFrom.address.localName,
      geoLocFrom.address.streetName,
      geoLocFrom.address.country,
      geoLocFrom.address.streetNumber
        ? Number(geoLocFrom.address.streetNumber)
        : 0
    );

    const tripEnd = new Address(
      geoLocTo.address.localName,
      geoLocTo.address.streetName,
      geoLocTo.address.country,
      geoLocTo.address.streetNumber ? Number(geoLocTo.address.streetNumber) : 0
    );

    setTripHistory([
      { addressTo: tripEnd, addressFrom: tripStart },
      ...tripHistory,
    ]);

    setGeoLocFrom(null);
    setGeoLocTo(null);
    setAddressTo(null);
    setAddressFrom(null);
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
