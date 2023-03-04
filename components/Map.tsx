import { Context } from "@/context/adresses";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Map.module.css";
const Map = () => {
  const { geoLocTo, geoLocFrom, setGeoJson } = useContext(Context);

  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map>();

  useEffect(() => {
    const mapLogic = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");

      let map = tt.map({
        key: process.env.API_CEY!,
        container: mapElement.current!,
        center: [geoLocFrom.position.lon, geoLocFrom.position.lat],
        zoom: 9,
      });

      setMap(map);

      new tt.Marker()
        .setLngLat([geoLocTo.position.lon, geoLocTo.position.lat])
        .addTo(map);

      new tt.Marker()
        .setLngLat([geoLocFrom.position.lon, geoLocFrom.position.lat])
        .addTo(map);

      map.on("load", () => {
        drawRoute(map);
      });
    };

    const drawRoute = async (map: tt.Map) => {
      const ttt = await import("@tomtom-international/web-sdk-services");

      await ttt.services
        .calculateRoute({
          key: process.env.API_CEY!,
          locations: `${Object.values(
            geoLocFrom.position
          ).reverse()}:${Object.values(geoLocTo.position).reverse()}`,
        })

        .then((res) => {
          setGeoJson(res.toGeoJson());

          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: res.toGeoJson(),
            },
            paint: {
              "line-color": "red",
              "line-width": 3,
            },
          });
        });
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
