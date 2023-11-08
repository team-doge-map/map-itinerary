import { Marker, useMap } from "react-map-gl";
import { EventLocations } from "../data/mock/mockData";
import Pin from "./Pin";

type DogeMarkerProps = {
  data: EventLocations;
  callback: () => void;
};

export const DogeMarker = ({ data, callback }: DogeMarkerProps) => {
  const { dogeMap } = useMap();

  const onClick = () => {
    //@ts-expect-error
    dogeMap.flyTo({
      center: [
        data.location.coordinates.longitude,
        data.location.coordinates.latitude,
      ],
    });

    callback();
  };

  return (
    <Marker
      key={data.eventId}
      longitude={data.location.coordinates.longitude}
      latitude={data.location.coordinates.latitude}
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
