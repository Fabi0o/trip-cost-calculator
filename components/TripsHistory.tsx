import styles from "@/styles/TripsHistory.module.css";
const TripsHistory = ({ tripHistory }: any) => {
  return (
    <div className={styles.main_container}>
      <h3>Trips History</h3>

      {tripHistory.map((trip: any) => {
        return (
          <div
            key={tripHistory.indexOf(trip)}
            className={styles.trip_container}
          >
            <div>
              <h4 className={styles.trip_heading}>From:</h4>

              <div>
                {`${trip.adressFrom.city}, ${trip.adressFrom.streetAdress}${
                  trip.adressFrom.streetNumber
                    ? ` ${trip.adressFrom.streetNumber}`
                    : ""
                }, ${trip.adressFrom.country}`}
              </div>
            </div>

            <div>
              <h4 className={styles.trip_heading}>To:</h4>

              <div>
                {`${trip.adressTo.city}, ${trip.adressTo.streetAdress}${
                  trip.adressTo.streetNumber
                    ? ` ${trip.adressTo.streetNumber}`
                    : ""
                }, ${trip.adressTo.country}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripsHistory;
