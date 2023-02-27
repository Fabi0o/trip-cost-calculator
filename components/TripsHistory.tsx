const TripsHistory = ({ tripHistory }: any) => {
  return (
    <>
      {tripHistory.map((trip: any) => {
        return (
          <div key={tripHistory.indexOf(trip)}>
            <div>
              From:{" "}
              {`${trip.adressFrom.city}, ${trip.adressFrom.streetAdress}${
                trip.adressFrom.streetNumber
                  ? ` ${trip.adressFrom.streetNumber}`
                  : ""
              }, ${trip.adressFrom.country}`}
            </div>
            <div>
              To:{" "}
              {`${trip.adressTo.city}, ${trip.adressTo.streetAdress}${
                trip.adressTo.streetNumber
                  ? ` ${trip.adressTo.streetNumber}`
                  : ""
              }, ${trip.adressTo.country}`}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TripsHistory;
