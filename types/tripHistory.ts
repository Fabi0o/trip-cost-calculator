import Address from "./address";

type TripHistory = Array<{
  addressTo: Address;
  addressFrom: Address;
}>;

export default TripHistory;
