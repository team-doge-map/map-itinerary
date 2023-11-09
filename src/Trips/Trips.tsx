import { useMap } from "react-map-gl";
import { useTrips } from "../data/useTrips";
import {
  FloatingPanel,
  useClosePanel,
} from "../shared/FloatingPanel/FloatingPanel";
import { Trip } from "../data/mock/mockData";
import { useAtom } from "jotai";
import { eventLocationsAtom, popupAtom } from "../data/state";

export const Trips = () => {
  const [trips] = useTrips();
  const { dogeMap } = useMap();
  const [, setEventLocations] = useAtom(eventLocationsAtom);
  const [, setPopup] = useAtom(popupAtom);
  const closePanel = useClosePanel();

  const onSelectTrip = (tripId: string, trip?: Trip) => {
    if (!trip) return;

    // TODO: make this better - setting eventLocations as eventLocations is for the pins
    setEventLocations([
      {
        eventId: trip.name,
        locationId: trip.name,
        location: {
          coordinates: {
            longitude: trip.coordinates.longitude,
            latitude: trip.coordinates.latitude,
          },
          name: trip.name,
        },
      },
    ]);

    // TODO: make this better - pin data is for the contextual popup
    setPopup({
      linkTo: `/trip/${tripId}`,
      state: { tripId },
      eventLocation: {
        eventId: trip.name,
        locationId: trip.name,
        location: {
          coordinates: {
            longitude: trip.coordinates.longitude,
            latitude: trip.coordinates.latitude,
          },
          name: trip.name,
        },
      },
    });
    dogeMap?.flyTo({
      center: [trip.coordinates.longitude, trip.coordinates.latitude],
    });

    closePanel();
  };
  return (
    <>
      <FloatingPanel>
        {Object.keys(trips || {}).map((tripId) => {
          const trip = trips?.[tripId];

          return (
            <button onClick={() => onSelectTrip(tripId, trip)} key={tripId}>
              <h1>{trips?.[tripId].name}</h1>
            </button>
          );
        })}
      </FloatingPanel>
    </>
  );
};
