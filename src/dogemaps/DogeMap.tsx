import Map, { Popup } from "react-map-gl";
import { EventLocations } from "../data/mock/mockData";
import { useMemo } from "react";
import { useAtom } from "jotai";
import { tripEventAtom } from "../data/TripEventAtom";
import { DogeMarker } from "./DogeMarker";

export const DogeMap = ({
  eventLocations,
}: {
  eventLocations: EventLocations[];
}) => {
  const [tripEvent, setTripEvent] = useAtom(tripEventAtom);

  const pins = useMemo(
    () =>
      eventLocations.map((event) => (
        <DogeMarker data={event} callback={() => setTripEvent(event)} />
      )),
    [eventLocations],
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
      {tripEvent && (
        <Popup
          anchor="top"
          longitude={Number(tripEvent.location.coordinates.longitude)}
          latitude={Number(tripEvent.location.coordinates.latitude)}
          onClose={() => setTripEvent(null)}
        >
          <div>{tripEvent.location.name}</div>
          <div>{tripEvent.location.address.address1}</div>
          <div>{tripEvent.location.address.address2}</div>
          <div>
            {tripEvent.location.address.city},{" "}
            {tripEvent.location.address.state ??
              tripEvent.location.address.country}{" "}
            {tripEvent.location.address.postalCode}
          </div>
        </Popup>
      )}
    </Map>
  );
};
