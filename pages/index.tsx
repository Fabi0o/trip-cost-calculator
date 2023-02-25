import { Context } from "@/context/adresses";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import Adress from "../types/adress";

export default function Home() {
  const router = useRouter();
  const { setGeoLocTo, setGeoLocFrom } = useContext(Context);

  let adressTo: Adress;
  let adressFrom: Adress;

  const fetchGeoLoc = (adress: Adress) => {
    return fetch(
      `https://api.tomtom.com/search/2/geocode/${adress.streetAdress} ${adress.streetNumber}, ${adress.city}.json?key=${process.env.API_CEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        return Object.values(data.results[0].position).reverse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    adressTo = {
      city: (target.querySelector("#city-to")! as HTMLInputElement).value,
      streetAdress: (target.querySelector("#street-to")! as HTMLInputElement)
        .value,
      streetNumber: Number(
        (target.querySelector("#street-number-to")! as HTMLInputElement).value
      ),
      country: (target.querySelector("#country-to")! as HTMLInputElement).value,
    };

    adressFrom = {
      city: (target.querySelector("#city-from")! as HTMLInputElement).value,
      streetAdress: (target.querySelector("#street-from")! as HTMLInputElement)
        .value,
      streetNumber: Number(
        (target.querySelector("#street-number-from")! as HTMLInputElement).value
      ),
      country: (target.querySelector("#country-from")! as HTMLInputElement)
        .value,
    };

    setGeoLocTo(await fetchGeoLoc(adressTo));
    setGeoLocFrom(await fetchGeoLoc(adressFrom));

    router.push("/trip");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>From</legend>
        <label htmlFor="city-from">City</label>
        <input type="text" id="city-from" required />
        <label htmlFor="street-from">Street name</label>
        <input type="text" id="street-from" required />
        <label htmlFor="street-number-from">Street number</label>
        <input type="number" id="street-number-from" />
        <label htmlFor="country-from">Country</label>
        <input type="text" id="country-from" required />
      </fieldset>
      <fieldset>
        <legend>To</legend>
        <label htmlFor="city-to">City</label>
        <input type="text" id="city-to" required />
        <label htmlFor="street-to">Street name</label>
        <input type="text" id="street-to" required />
        <label htmlFor="street-number-to">Street number</label>
        <input type="number" id="street-number-to" />
        <label htmlFor="country-to">Country</label>
        <input type="text" id="country-to" required />
      </fieldset>
      <button>Calculate trip cost</button>
    </form>
  );
}
