import { Context } from "@/context/adresses";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {
  const router = useRouter();
  const { adressTo, setAdressTo, adressFrom, setAdressFrom } =
    useContext(Context);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    setAdressTo({
      city: (target.querySelector("#city-to")! as HTMLInputElement).value,
      streetAdress: (target.querySelector("#street-to")! as HTMLInputElement)
        .value,
      streetNumber: (
        target.querySelector("#street-number-to")! as HTMLInputElement
      ).value,
      country: (target.querySelector("#country-to")! as HTMLInputElement).value,
    });
    setAdressFrom({
      city: (target.querySelector("#city-from")! as HTMLInputElement).value,
      streetAdress: (target.querySelector("#street-from")! as HTMLInputElement)
        .value,
      streetNumber: (
        target.querySelector("#street-number-from")! as HTMLInputElement
      ).value,
      country: (target.querySelector("#country-from")! as HTMLInputElement)
        .value,
    });
    router.push("/map");
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
