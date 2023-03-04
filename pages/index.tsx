import { Context } from "@/context/addresses";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Address from "../types/address";
import { APIres, resultsItem } from "@/types/apires";
import TripsHistory from "@/components/TripsHistory";

export default function Home() {
  const router = useRouter();

  const {
    geoLocTo,
    setGeoLocTo,
    geoLocFrom,
    setGeoLocFrom,
    addressTo,
    setAddressTo,
    addressFrom,
    setAddressFrom,
    tripHistory,
  } = useContext(Context);

  const [cityFrom, setCityFrom] = useState("");
  const [streetFrom, setStreetFrom] = useState("");
  const [streetNumberFrom, setStreetNumberFrom] = useState("");
  const [countryFrom, setCountryFrom] = useState("");

  const [cityTo, setCityTo] = useState("");
  const [streetTo, setStreetTo] = useState("");
  const [streetNumberTo, setStreetNumberTo] = useState("");
  const [countryTo, setCountryTo] = useState("");

  const fetchGeoLoc = (address: Address) => {
    return fetch(
      `https://api.tomtom.com/search/2/geocode/${address.streetAddress} ${address.streetNumber}, ${address.city}.json?key=${process.env.API_CEY}`
    )
      .then((res) => res.json())

      .then((data: APIres | undefined) => {
        return data.results[0];
      })

      .catch(() => {
        alert(`Wrong Address of city:${address.city}!`);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAddressTo(
      new Address(cityTo, streetTo, countryTo, Number(streetNumberTo))
    );

    setAddressFrom(
      new Address(cityFrom, streetFrom, countryFrom, Number(streetNumberFrom))
    );
  };

  useEffect(() => {
    if (addressTo) {
      const setGeo = async () => {
        await fetchGeoLoc(addressTo).then((res: resultsItem) => {
          setGeoLocTo(res);
        });
      };

      setGeo();
    }

    if (addressFrom) {
      const setGeo = async () => {
        await fetchGeoLoc(addressFrom).then((res: resultsItem) => {
          setGeoLocFrom(res);
        });
      };

      setGeo();
    }
  }, [addressTo, addressFrom]);

  useEffect(() => {
    if (geoLocTo && geoLocFrom) {
      router.push("/trip");
    }
  }, [geoLocFrom, geoLocTo]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.container}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_legend}>From</legend>

            <div className={styles.form_cell}>
              <label htmlFor="city-from">City</label>
              <input
                type="text"
                id="city-from"
                required
                onChange={(e) => setCityFrom(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="street-from">Street name</label>
              <input
                type="text"
                id="street-from"
                required
                onChange={(e) => setStreetFrom(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="street-number-from">Street number</label>
              <input
                type="number"
                id="street-number-from"
                onChange={(e) => setStreetNumberFrom(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="country-from">Country</label>
              <input
                type="text"
                id="country-from"
                required
                onChange={(e) => setCountryFrom(e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.form_legend}>To</legend>
            <div className={styles.form_cell}>
              <label htmlFor="city-to">City</label>
              <input
                type="text"
                id="city-to"
                required
                onChange={(e) => setCityTo(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="street-to">Street name</label>
              <input
                type="text"
                id="street-to"
                required
                onChange={(e) => setStreetTo(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="street-number-to">Street number</label>
              <input
                type="number"
                id="street-number-to"
                onChange={(e) => setStreetNumberTo(e.target.value)}
              />
            </div>

            <div className={styles.form_cell}>
              <label htmlFor="country-to">Country</label>
              <input
                type="text"
                id="country-to"
                required
                onChange={(e) => setCountryTo(e.target.value)}
              />
            </div>
          </fieldset>
        </div>

        <button className={styles.form_button}>Calculate trip cost</button>
      </form>

      {tripHistory[0] && <TripsHistory tripHistory={tripHistory} />}
    </>
  );
}
