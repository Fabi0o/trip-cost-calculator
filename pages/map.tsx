import { Context } from "@/context/adresses";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Map.module.css";
const Map = () => {
  const { geoLocTo, setGeoLocTo, geoLocFrom, setGeoLocFrom } =
    useContext(Context);
  const mapElement: any = useRef();
  const [map, setMap] = useState({});
  useEffect(() => {
    const mapLogic = async () => {
      mapElement.innerHTML = "";
      const tt = await import("@tomtom-international/web-sdk-maps");
      let map = tt.map({
        key: process.env.API_CEY!,
        container: mapElement.current,
        center: [Number(geoLocTo[0]), Number(geoLocTo[1])],
        zoom: 9,
      });
      new tt.Marker().setLngLat([geoLocTo[0], geoLocTo[1]]).addTo(map);
      new tt.Marker().setLngLat([geoLocFrom[0], geoLocFrom[1]]).addTo(map);
      setMap(map);
    };
    mapLogic();
  }, []);
  return (
    <>
      <div ref={mapElement} className={styles.map_container}></div>
    </>
  );
};
export default Map;
