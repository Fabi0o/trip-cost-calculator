import { Context } from "@/context/adresses";
import { useContext, useEffect, useState } from "react";
import Map from "@/components/map";
const Trip = () => {
  const { geoJson } = useContext(Context);
  const [tripLength, setTripLength] = useState(0);
  useEffect(() => {
    if (!geoJson) return;
    setTripLength(
      Math.floor(geoJson.features[0].properties.summary.lengthInMeters / 1000)
    );
  }, [geoJson]);
  return (
    <>
      <div>Trip length: {tripLength} km</div>
      <Map></Map>
    </>
  );
};

export default Trip;
