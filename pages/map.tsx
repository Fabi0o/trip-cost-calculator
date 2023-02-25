import { Context } from "@/context/adresses";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Map.module.css";
const Map = () => {
  const { geoLocTo, geoLocFrom } = useContext(Context);

  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map>();

  useEffect(() => {
    const mapLogic = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");

      let map = tt.map({
        key: process.env.API_CEY!,
        container: mapElement.current!,
        center: geoLocFrom,
        zoom: 9,
      });
      setMap(map);

      new tt.Marker().setLngLat(geoLocTo).addTo(map);
      new tt.Marker().setLngLat(geoLocFrom).addTo(map);
      map.on("load", () => {
        drawRoute(map);
      });
    };

    const drawRoute = async (map: tt.Map) => {
      const ttt = await import("@tomtom-international/web-sdk-services");

      let geoJson;

      await ttt.services
        .calculateRoute({
          key: process.env.API_CEY!,
          locations: `${geoLocFrom}:${geoLocTo}`,
        })
        .then((res) => {
          geoJson = res.toGeoJson();
        });

      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geoJson,
        },
        paint: {
          "line-color": "red",
          "line-width": 6,
        },
      });
    };

    mapLogic();
  }, [geoLocTo, geoLocFrom]);

  return (
    <>
      <div ref={mapElement} className={styles.map_container}></div>
    </>
  );
};
export default Map;
