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
                {`${trip.addressFrom.city}, ${trip.addressFrom.streetAddress}${
                  trip.addressFrom.streetNumber
                    ? ` ${trip.addressFrom.streetNumber}`
                    : ""
                }, ${trip.addressFrom.country}`}
              </div>
            </div>

            <div>
              <h4 className={styles.trip_heading}>To:</h4>

              <div>
                {`${trip.addressTo.city}, ${trip.addressTo.streetAddress}${
                  trip.addressTo.streetNumber
                    ? ` ${trip.addressTo.streetNumber}`
                    : ""
                }, ${trip.addressTo.country}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripsHistory;
