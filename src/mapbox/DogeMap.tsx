import Map, { Marker, Popup } from "react-map-gl";
import { Trip, TripEvent } from "../data/mock/mockData";
import { useMemo, useState } from "react";
import Pin from "./Pin";

export const DogeMap = ({ trip }: { trip: Trip }) => {
  const [selectedEvent, setSelectedEvent] = useState<TripEvent>(null);
  const events = [];
  // TODO: use the selected itinerary based on the selected date?
  trip.itinerary[0].tripEvent.forEach((event) => {
    events.push(event);
  });

  const pins = useMemo(
    () =>
      events.map((event) => (
        <Marker
          key={event.eventId}
          longitude={event.location.lng}
          latitude={event.location.lat}
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
          longitude={Number(selectedEvent.location.lng)}
          latitude={Number(selectedEvent.location.lat)}
          onClose={() => setSelectedEvent(null)}
        >
          <div>{selectedEvent.name}</div>
          <div>{selectedEvent.location.addressLine1}</div>
          <div>{selectedEvent.location.addressLine2}</div>
          <div>
            {selectedEvent.location.city}, {selectedEvent.location.state}{" "}
            {selectedEvent.location.zip}
          </div>
        </Popup>
      )}
    </Map>
  );
};
