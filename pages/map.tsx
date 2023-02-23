import { Context } from "@/context/adresses";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Map.module.css";
const Map = () => {
  const { adressTo, setAdressTo, adressFrom, setAdressFrom } =
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
        center: [-0.112, 51.504],
        zoom: 9,
      });
      new tt.Marker().setLngLat([-0.112, 51.504]).addTo(map);
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
