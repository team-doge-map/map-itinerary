import { Marker, useMap } from "react-map-gl";
import { EventLocations, Suggestion } from "../data/mock/mockData";
import { DogeSuggestedPin } from "./Pin";

type DogeMarkerProps = {
  suggestion: Suggestion;
  callback: (eventLocation: EventLocations) => void;
};

const convertSuggestionToEventLocation = (suggestion: Suggestion) => {
  return {
    eventId: suggestion.id,
    locationId: suggestion.id,
    location: {
      coordinates: {
        longitude: suggestion.center[0],
        latitude: suggestion.center[1],
      },
      name: suggestion.place_name_en,
    },
  };
};

export const DogeSuggestedPlace = ({
  suggestion,
  callback,
}: DogeMarkerProps) => {
  const { dogeMap } = useMap();

  const onClick = () => {
    dogeMap?.flyTo({
      center: [suggestion.center[0], suggestion.center[1]],
    });

    callback(convertSuggestionToEventLocation(suggestion));
  };

  return (
    <Marker
      longitude={suggestion.center[0]}
      latitude={suggestion.center[1]}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick();
      }}
    >
      <DogeSuggestedPin />
    </Marker>
  );
};
