export default class Address {
  city: string;
  streetAddress: string;
  streetNumber?: number;
  country: string;

  constructor(
    city: string,
    streetAddress: string,
    country: string,
    streetNumber?: number
  ) {
    this.city = city;
    this.streetAddress = streetAddress;
    this.country = country;
    this.streetNumber = streetNumber;
  }
}
