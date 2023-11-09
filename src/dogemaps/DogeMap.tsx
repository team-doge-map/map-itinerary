import Map from "react-map-gl";
import { useId, useState } from "react";
import { useAtom } from "jotai";
import { eventLocationsAtom, popupAtom } from "../data/state";
import { DogeMarker } from "./DogeMarker";
import { DogePopup } from "./DogePopup";
import { EventLocations } from "../data/mock/mockData";
import { LngLat } from "mapbox-gl";

var timer: ReturnType<typeof setTimeout>;

export const DogeMap = () => {
  // TODO: make this better - the popup atom is used to track the popup that should appear on the map for the currently selected event
  const [, setPopup] = useAtom(popupAtom);
  // TODO: make this better - the eventLocations atom is used to track the pins that should appear on the map
  const [eventLocations] = useAtom(eventLocationsAtom);

  const [tempMarker, setTempMarker] = useState<EventLocations>();
  const tempEventId = useId();
  const tempLocationId = useId();

  const handleTempMarker = ({ lat, lng }: LngLat) => {
    timer = setTimeout(() => {
      setTempMarker({
        eventId: tempEventId,
        locationId: tempLocationId,
        location: {
          coordinates: { latitude: lat, longitude: lng },
          name: "new marker",
        },
      });
    }, 400);
  };

  const clearMouseTimer = () => {
    if (timer) clearTimeout(timer);
  };

  return (
    <Map
      id="dogeMap"
      mapboxAccessToken="pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg"
      initialViewState={{
        longitude: -93.17234701429481,
        latitude: 44.96006944733637,
        zoom: 6,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      reuseMaps={true}
      onMouseDown={({ lngLat }) => handleTempMarker(lngLat)}
      onMouseUp={clearMouseTimer}
      onDrag={clearMouseTimer}
    >
      {eventLocations.map((event) => (
        <DogeMarker
          key={event.eventId}
          data={event}
          callback={() => setPopup({ eventLocation: event })}
        />
      ))}

      {tempMarker ? (
        <DogeMarker
          key={tempMarker.eventId}
          data={tempMarker}
          callback={() => undefined}
        />
      ) : null}
      <DogePopup />
    </Map>
  );
};
