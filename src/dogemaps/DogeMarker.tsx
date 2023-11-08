import { Marker, useMap } from "react-map-gl";
import { TripEvent } from "../data/mock/mockData";
import Pin from "./Pin";

type DogeMarkerProps = {
  data: TripEvent;
  callback: () => void;
};

export const DogeMarker = ({ data, callback }: DogeMarkerProps) => {
  const { dogeMap } = useMap();

  const onClick = () => {
    //@ts-expect-error
    dogeMap.flyTo({
      center: [data.location.lng, data.location.lat],
    });

    callback();
  };

  return (
    <Marker
      key={data.eventId}
      longitude={data.location.lng}
      latitude={data.location.lat}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick();
      }}
    >
      <Pin />
    </Marker>
  );
};
