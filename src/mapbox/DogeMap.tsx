import Map, { Marker, Popup } from "react-map-gl";
import { EventLocations } from "../data/mock/mockData";
import { useMemo, useState } from "react";
import Pin from "./Pin";

export const DogeMap = ({ eventLocations}: { eventLocations: EventLocations[]}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventLocations>(null);
  const pins = useMemo(
    () =>
      eventLocations.map((event) => (
        <Marker
          key={event.locationId}
          longitude={event.location.coordinates.longitude}
          latitude={event.location.coordinates.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.preventDefault();
            console.log("- on click called", { event });
            setSelectedEvent(event);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );
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
    >
      {pins}
      {selectedEvent && (
        <Popup
          anchor="top"
          longitude={Number(selectedEvent.location.coordinates.longitude)}
          latitude={Number(selectedEvent.location.coordinates.latitude)}
          onClose={() => setSelectedEvent(null)}
        >
          <div>{selectedEvent.location.name}</div>
          <div>{selectedEvent.location.address.address1}</div>
          <div>{selectedEvent.location.address.address2}</div>
          <div>
            {selectedEvent.location.address.city}, {selectedEvent.location.address.state ?? selectedEvent.location.address.country}{" "}
            {selectedEvent.location.address.postalCode}
          </div>
        </Popup>
      )}
    </Map>
  );
};
