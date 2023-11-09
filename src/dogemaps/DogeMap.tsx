import Map, { Layer, Source } from "react-map-gl";
import { useMemo, useEffect, useState } from "react";
import type { LineLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import { useAtom } from "jotai";
import { eventLocationsAtom, popupAtom } from "../data/state";
import { DogeMarker } from "./DogeMarker";
import { DogePopup } from "./DogePopup";
import { useSuggestions } from "../data/useSuggestions";
import { DogeSuggestedPlace } from "./DogeSuggestedPlace";
import { fetchRoute } from "../data/fetchRoute";

export const DogeMap = () => {
  // TODO: make this better - the popup atom is used to track the popup that should appear on the map for the currently selected event
  const [, setPopup] = useAtom(popupAtom);
  // TODO: make this better - the eventLocations atom is used to track the pins that should appear on the map
  const [eventLocations] = useAtom(eventLocationsAtom);
  const { suggestions } = useSuggestions();
  const [routeLayer, setRouteLayer] = useState<FeatureCollection>();
  const lines: LineLayer = {
    type: "line",
    id: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3887be",
      "line-width": 5,
      "line-opacity": 0.75,
    },
  };

  useEffect(() => {
    async function getRoute() {
      const route = await fetchRoute();

      //@ts-expect-error
      setRouteLayer(route);
    }
    getRoute();
  }, []);

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
      {eventLocations.map((event) => (
        <DogeMarker
          key={event.eventId}
          data={event}
          callback={() => setPopup({ eventLocation: event })}
        />
      ))}
      {suggestions.map((suggestion) => (
        <DogeSuggestedPlace
          key={suggestion.id}
          suggestion={suggestion}
          callback={(eventLocation) =>
            setPopup({ eventLocation, isSuggestion: true })
          }
        />
      ))}
      {routeLayer && (
        <Source id="stuff" type="geojson" data={routeLayer}>
          <Layer {...lines} />
        </Source>
      )}
      <DogePopup />
    </Map>
  );
};
