import { Context } from "@/context/adresses";
import { useContext, useEffect, useState } from "react";
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
    <>
      <div>
        From:{" "}
        {`${adressFrom.city}, ${adressFrom.streetAdress} ${adressFrom.streetNumber}, ${adressFrom.country}`}
      </div>
      <div>
        To:{" "}
        {`${adressTo.city}, ${adressTo.streetAdress} ${adressTo.streetNumber}, ${adressTo.country}`}
      </div>
      <div>Trip length: {tripLength} km</div>
      <form>
        <label htmlFor="cost">Cost of 1km</label>
        <input
          type="number"
          value={costOfkm}
          onChange={(e) => {
            if (e.target.value[0] == "0")
              e.target.value = e.target.value.slice(1);
            setCostOfkm(Number(e.target.value));
          }}
        />
      </form>
      <div>Total cost of the trip:{tripCost}$</div>
    </>
  );
};

export default TripDetails;
