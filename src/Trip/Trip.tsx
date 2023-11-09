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
import { eventLocationsAtom, popupAtom } from "../data/state";
import { useNavigate, useParams } from "react-router-dom";

export const TripDisplay = () => {
  const { dogeMap } = useMap();
  const [, setPopup] = useAtom(popupAtom);
  const [eventLocations, setEventLocations] = useAtom(eventLocationsAtom);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const database = getDatabase();
  const { tripId } = useParams<"tripId">();

  // this is bad. but it will work for now. grab all locations. yuck.
  const [trip, tripLoading] = useTrip(tripId || "");
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
    setPopup({ eventLocation: tripEvent });
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
    const newPage =
      currentPage >= itineraries.length - 1 ? currentPage : currentPage + 1;
    setCurrentPage(newPage);
  };

  const onNavigate = () => {
    setPopup(null);
    navigate(-1);
  };

  if (tripLoading) {
    return null;
  }

  return (
    <>
      <FloatingPanel>
        <div className={styles.trip}>
          <div>
            <div className={styles.tripBreadcrumbs}>
              <button
                onClick={() => onNavigate()}
                className={styles.tripBackBreacdcrumb}
              >
                Trips
              </button>
              <h2>{">"}</h2>
              <h2>{trip?.name}</h2>
            </div>
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
