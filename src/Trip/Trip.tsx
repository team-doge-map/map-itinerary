import { useState } from "react";
import { Location, SomeData, TripEvent } from "../data/mock/mockData";
import { DogeMap } from "../mapbox/DogeMap";
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import styles from "./trip.module.css";
import { useMap } from "react-map-gl";
import * as React from "react";

const Details = ({ location }: { location: Location }) => (
  <div className={styles.details}>
    <h5>Address:</h5>
    <p>{location.addressLine1}</p>
    {location.addressLine2 && <p>{location.addressLine2}</p>}
    <p>
      {location.city}, {location.state} {location.zip}
    </p>
  </div>
);

export const Trip = () => {
  const { dogeMap } = useMap();
  const [expandedDetail, setExpandedDetail] = useState(0);

  const onSelectDetail = (tripEvent: TripEvent) => {
    // TODO: highlight the button or something?
    setExpandedDetail(tripEvent.eventId);
    dogeMap.flyTo({
      center: [tripEvent.location.lng, tripEvent.location.lat],
    });
  };

  return (
    <>
      <FloatingPanel>
        <div className={styles.trip}>
          <div>
            <h2>{SomeData.name}</h2>
            <h3>{SomeData.itinerary[0].date}</h3>
          </div>
          {SomeData.itinerary[0].tripEvent.map((detail) => (
            <React.Fragment key={detail.eventId}>
              <button
                key={detail.eventId}
                onClick={() => onSelectDetail(detail)}
              >
                <h3>{detail.name}</h3>
              </button>
              {expandedDetail === detail.eventId && (
                <Details location={detail.location} />
              )}
            </React.Fragment>
          ))}
        </div>
      </FloatingPanel>
      <DogeMap trip={SomeData} />
    </>
  );
};
