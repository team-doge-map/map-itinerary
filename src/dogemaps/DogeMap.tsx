import Map, { Popup } from "react-map-gl";
import { Trip, TripEvent } from "../data/mock/mockData";
import { useMemo } from "react";
import { DogeMarker } from "./DogeMarker";
import { useAtom } from "jotai";
import { tripEventAtom } from "../data/TripEventAtom";

export const DogeMap = ({ trip }: { trip: Trip }) => {
  const [tripEvent, setTripEvent] = useAtom(tripEventAtom);
  const events: TripEvent[] = [];

  // TODO: use the selected itinerary based on the selected date?
  trip.itinerary[0].tripEvent.forEach((event) => {
    events.push(event);
  });

  const pins = useMemo(
    () =>
      events.map((event) => (
        <DogeMarker data={event} callback={() => setTripEvent(event)} />
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
      {!!tripEvent && (
        <Popup
          anchor="bottom"
          longitude={tripEvent.location.lng}
          latitude={tripEvent.location.lat}
          onClose={() => setTripEvent(null)}
          focusAfterOpen={true}
        >
          <div>{tripEvent.name}</div>
          <div>{tripEvent.location.addressLine1}</div>
          <div>{tripEvent.location.addressLine2}</div>
          <div>
            {tripEvent.location.city}, {tripEvent.location.state}{" "}
            {tripEvent.location.zip}
          </div>
        </Popup>
      )}
    </Map>
  );
};
