import { useState, useEffect } from "react";
import { Location, EventLocations } from "../data/mock/mockData";
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import styles from "./trip.module.css";
import { useMap } from "react-map-gl";
import * as React from "react";
import { useTrip } from "../data/useTrip";
import { useAtom } from "jotai";
import { tripEventAtom } from "../data/TripEventAtom";

export const TripDisplay = () => {
  const { dogeMap } = useMap();
  const [, setTripEvent] = useAtom(tripEventAtom);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventLocations, setEventLocations] = useState<EventLocations[]>([]);
  const database = getDatabase();
  // just grab first trip for right now.
  const [trip, tripLoading] = useTrip("trip1");
  // this is bad. but it will work for now. grab all locations. yuck.
  const [locations, locationsLoading] = useObjectVal<Location>(
    ref(database, "locations"),
  );
  const itineraries = trip ? Object.values(trip.itineraries) : [];
  const currentItinerary = itineraries[currentPage];

  useEffect(() => {
    if (currentItinerary && locations && !locationsLoading) {
      const events = currentItinerary.events;
      let newEventLocations: EventLocations[] = [];
      for (const [key, value] of Object.entries(events)) {
        // @ts-expect-error
        const location: Location = locations[value.locationId];
        newEventLocations.push({
          ...value,
          location,
          eventId: key,
        });
      }
      setEventLocations(newEventLocations);
    }
  }, [currentItinerary, locations, locationsLoading]);

  const onSelectDetail = (tripEvent: EventLocations) => {
    // TODO: highlight the button or something?
    setTripEvent(tripEvent);
    dogeMap?.flyTo({
      center: [
        tripEvent.location.coordinates.longitude,
        tripEvent.location.coordinates.latitude,
      ],
    });
  };

  const onPrevious = () => {
    const newPage = currentPage <= 0 ? 0 : currentPage - 1;
    setCurrentPage(newPage);
  };

  const onNext = () => {
    const newPage = currentPage >= itineraries.length - 1 ? currentPage : currentPage + 1;
    setCurrentPage(newPage);
  };

  if (tripLoading) {
    return null;
  }

  return (
    <>
      <FloatingPanel>
        <div className={styles.trip}>
          <div>
            <h2>{trip?.name}</h2>
            <h3>{currentItinerary.date}</h3>
            <button onClick={onPrevious}>Prev</button>
            <button onClick={onNext}>Next</button>
          </div>
          {eventLocations.map((detail) => (
            <React.Fragment key={detail.locationId}>
              <button
                key={detail.locationId}
                onClick={() => onSelectDetail(detail)}
              >
                <h3>{detail.location.name}</h3>
              </button>
            </React.Fragment>
          ))}
        </div>
      </FloatingPanel>
    </>
  );
};
