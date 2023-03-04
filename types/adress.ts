export default class Adress {
  city: string;
  streetAdress: string;
  streetNumber?: number;
  country: string;

  constructor(
    city: string,
    streetAdress: string,
    country: string,
    streetNumber?: number
  ) {
    this.city = city;
    this.streetAdress = streetAdress;
    this.country = country;
    this.streetNumber = streetNumber;
  }
}
