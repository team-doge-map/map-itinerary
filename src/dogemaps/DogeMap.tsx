import Map, { Popup } from "react-map-gl";
import { useMemo } from "react";
import { useAtom } from "jotai";
import { eventLocationsAtom, popupAtom } from "../data/state";
import { DogeMarker } from "./DogeMarker";

export const DogeMap = () => {
  // TODO: make this better - the `tripEvent` atom is used to track the currently selected event
  const [popupData, setPopup] = useAtom(popupAtom);
  // TODO: make this better - the eventLocations atom is used to track the pins that should appear on the map
  const [eventLocations] = useAtom(eventLocationsAtom);

  const pins = useMemo(
    () =>
      eventLocations.map((event) => (
        <DogeMarker
          data={event}
          callback={() => setPopup({ eventLocation: event })}
        />
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
      {popupData && (
        <Popup
          anchor="top"
          longitude={Number(
            popupData.eventLocation.location.coordinates.longitude,
          )}
          latitude={Number(
            popupData.eventLocation.location.coordinates.latitude,
          )}
          onClose={() => setPopup(null)}
        >
          <div>
            {popupData.linkTo ? (
              <a href={popupData.linkTo}>
                {popupData.eventLocation.location.name}
              </a>
            ) : (
              <span>{popupData.eventLocation.location.name}</span>
            )}
          </div>
          <div>{popupData.eventLocation.location.address?.address1}</div>
          <div>{popupData.eventLocation.location.address?.address2}</div>
          <div>
            {popupData.eventLocation.location.address?.city
              ? `${popupData.eventLocation.location.address?.city}, `
              : ""}
            {popupData.eventLocation.location.address?.state ??
              popupData.eventLocation.location.address?.country}{" "}
            {popupData.eventLocation.location.address?.postalCode}
          </div>
        </Popup>
      )}
    </Map>
  );
};
