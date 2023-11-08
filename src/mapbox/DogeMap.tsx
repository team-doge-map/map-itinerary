import Map, { Marker } from "react-map-gl";
import { Trip } from "../data/mock/mockData";
import { useMemo } from "react";
import Pin from "./Pin";

export const DogeMap = ({ trip }: { trip: Trip }) => {
  // These markers don't seem to stick to the right place on the map :-/
  const locations = [];
  trip.itinerary.forEach((day) => {
    day.tripEvent.forEach((event) => {
      locations.push(event.location);
    });
  });

  const pins = useMemo(
    () =>
      locations.map((location) => (
        <Marker
          key={`${location.lat}-${location.lng}`}
          longitude={location.lng}
          latitude={location.lat}
          anchor="bottom"
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
    </Map>
  );
};
