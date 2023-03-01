import { Context } from "@/context/adresses";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/TripDetails.module.css";
const TripDetails = () => {
  const { geoJson, geoLocFrom, geoLocTo } = useContext(Context);
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
        {`${geoLocFrom.address.localName}, ${geoLocFrom.address.streetName}${
          geoLocFrom.address.streetNumber
            ? ` ${geoLocFrom.address.streetNumber}`
            : ""
        }, ${geoLocFrom.address.country}`}
      </div>

      <div className={styles.adress_container}>
        <h3 className={styles.heading}>To:</h3>
        {`${geoLocTo.address.localName}, ${geoLocTo.address.streetName}${
          geoLocTo.address.streetNumber
            ? ` ${geoLocTo.address.streetNumber}`
            : ""
        }, ${geoLocTo.address.country}`}
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
