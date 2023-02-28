import { Context } from "@/context/adresses";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/TripDetails.module.css";
const TripDetails = () => {
  const { geoJson, adressTo, adressFrom } = useContext(Context);
  const [tripLength, setTripLength] = useState(0);
  const [costOfkm, setCostOfkm] = useState(2);
  const [tripCost, setTripCost] = useState(0);

  useEffect(() => {
    if (!geoJson) return;
    setTripLength(
      Math.floor(geoJson.features[0].properties.summary.lengthInMeters / 100) /
        10
    );
  }, [geoJson]);

  useEffect(() => {
    const fullDaysCost = Math.floor(tripLength / 800) * 1000;
    const kmCost = tripLength * costOfkm;
    setTripCost(Math.floor((kmCost * 1.1 + fullDaysCost) * 100) / 100);
  }, [costOfkm, tripLength]);

  return (
    <div className={styles.container}>
      <div className={styles.adress_container}>
        <h3 className={styles.heading}>From:</h3>
        {`${adressFrom.city}, ${adressFrom.streetAdress}${
          adressFrom.streetNumber ? ` ${adressFrom.streetNumber}` : ""
        }, ${adressFrom.country}`}
      </div>

      <div className={styles.adress_container}>
        <h3 className={styles.heading}>To:</h3>
        {`${adressTo.city}, ${adressTo.streetAdress}${
          adressTo.streetNumber ? ` ${adressTo.streetNumber}` : ""
        }, ${adressTo.country}`}
      </div>
      <div>Trip length: {tripLength} km</div>
      <form>
        <label htmlFor="cost">Cost of 1km </label>
        <input
          type="number"
          value={costOfkm}
          onChange={(e) => {
            if (Number(e.target.value[0]) == 0 || e.target.value[0] == "-")
              e.target.value = e.target.value.slice(1);
            if (Number(e.target.value) > 9999) e.target.value = "9999";
            setCostOfkm(Number(e.target.value));
          }}
          className={styles.input}
        />
      </form>
      <div>Total cost of the trip:{tripCost}$</div>
    </div>
  );
};

export default TripDetails;
