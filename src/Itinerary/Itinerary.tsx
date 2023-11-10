import { Location, EventLocations } from "../data/mock/mockData";
import * as React from "react";
import { useClosePanel } from "../shared/FloatingPanel/FloatingPanel";
import { useMap } from "react-map-gl";
import { useAtom } from "jotai";
import { popupAtom } from "../data/state";

export const Itinerary = ({ locations }: { locations: EventLocations[] }) => {
  const { dogeMap } = useMap();
  const [, setPopup] = useAtom(popupAtom);
  const closePanel = useClosePanel();

  const onSelectDetail = (tripEvent: EventLocations) => {
    // TODO: highlight the button or something?
    setPopup({ eventLocation: tripEvent });
    dogeMap?.flyTo({
      center: [
        tripEvent.location.coordinates.longitude,
        tripEvent.location.coordinates.latitude,
      ],
    });
    closePanel();
  };

  if (!locations || locations.length === 0) {
    return <span>You have no events for the day</span>;
  }

  return (
    <>
      {locations.map((detail) => (
        <React.Fragment key={detail.locationId}>
          <button
            key={detail.locationId}
            onClick={() => onSelectDetail(detail)}
          >
            <h3>{detail.location.name}</h3>
          </button>
        </React.Fragment>
      ))}
    </>
  );
};
