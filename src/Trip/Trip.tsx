import { useState, useEffect } from "react";
import { Location, Trip, Event, EventLocations } from "../data/mock/mockData";
import { DogeMap } from "../dogemaps/DogeMap";
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import styles from "./trip.module.css";
import { useMap } from "react-map-gl";
import * as React from "react";
import { useTrip } from "../data/useTrip";

const Details = ({ location }: { location: Location }) => (
  <div className={styles.details}>
    <h5>Address:</h5>
    <p>{location.address.address1}</p>
    {location.address.address2 && <p>{location.address.address2}</p>}
    <p>
      {location.address.city},{" "}
      {location.address.state ?? location.address.country}{" "}
      {location.address.postalCode}
    </p>
  </div>
);

export const TripDisplay = () => {
  const { dogeMap } = useMap();
  const [expandedDetail, setExpandedDetail] = useState("");
  const [eventLocations, setEventLocations] = useState<EventLocations[]>([]);
  const database = getDatabase();
  // just grab first trip for right now.
  const [trip, tripLoading] = useTrip("trip1");
  // this is bad. but it will work for now. grab all locations. yuck.
  const [locations, locationsLoading] = useObjectVal<Location>(
    ref(database, "locations"),
  );

  useEffect(() => {
    if (trip && locations && !locationsLoading && !tripLoading) {
      const itinerary = trip.itineraries.itinerary1;
      const events = itinerary.events;
      let newEventLocations: EventLocations[] = [];
      for (const [key, value] of Object.entries(events)) {
        const location: Location = locations[value.locationId];
        newEventLocations.push({
          ...value,
          location,
          eventId: key,
        });
      }
      setEventLocations(newEventLocations);
    }
  }, [trip, locations, locationsLoading, tripLoading]);

  const onSelectDetail = (tripEvent: EventLocations) => {
    // TODO: highlight the button or something?
    setExpandedDetail(tripEvent.locationId);
    dogeMap.flyTo({
      center: [
        tripEvent.location.coordinates.longitude,
        tripEvent.location.coordinates.latitude,
      ],
    });
  };

  if (tripLoading) {
    return null;
  }
  return (
    <>
      <FloatingPanel>
        <div className={styles.trip}>
          <div>
            <h2>{trip.name}</h2>
            <h3>{trip.itineraries.itinerary1.date}</h3>
          </div>
          {eventLocations.map((detail) => (
            <React.Fragment key={detail.locationId}>
              <button
                key={detail.locationId}
                onClick={() => onSelectDetail(detail)}
              >
                <h3>{detail.location.name}</h3>
              </button>
              {expandedDetail === detail.locationId && (
                <Details location={detail.location} />
              )}
            </React.Fragment>
          ))}
        </div>
      </FloatingPanel>
      <DogeMap eventLocations={eventLocations} />
    </>
  );
};
