import { SomeData, TripEvent } from "../data/mock/mockData";
import { DogeMap } from "../dogemaps/DogeMap";
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import styles from "./trip.module.css";
import { useMap } from "react-map-gl";
import * as React from "react";
import { useAtom } from "jotai";
import { tripEventAtom } from "../data/TripEventAtom";

export const Trip = () => {
  const { dogeMap } = useMap();
  const [, setTripEvent] = useAtom(tripEventAtom);

  const onSelectDetail = (tripEvent: TripEvent) => {
    // TODO: highlight the button or something?
    setTripEvent(tripEvent);

    // @ts-expect-error
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
            </React.Fragment>
          ))}
        </div>
      </FloatingPanel>
      <DogeMap trip={SomeData} />
    </>
  );
};
