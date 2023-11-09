import { useEffect, useState } from "react";
import { useCategories } from "./useCategories";
import { Coordinates, Suggestion } from "./mock/mockData";
import { useAtom } from "jotai";
import { popupAtom } from "./state";

const access_token =
  "access_token=pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg";

const makeUrl = (category: string, coordinates: Coordinates) => {
  const { latitude, longitude } = coordinates;
  const proximity = `proximity=${longitude}%2C${latitude}`;
  const bbox = `bbox=${getBoundingBox(coordinates)}`;

  const mahURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?${access_token}&language=en&limit=5&${proximity}&${bbox}`;

  return mahURL;
};

const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LONG = -180;
const MAX_LONG = 180;

const getBoundingBox = (coordinates: Coordinates) => {
  const { latitude, longitude } = coordinates;
  const attemptedMinLat = latitude - 1;
  const attemptedMaxLat = latitude + 1;
  const attemptedMinLong = longitude - 2;
  const attemptedMaxLong = longitude + 2;

  const minLat =
    attemptedMinLat < MIN_LAT ? `${MIN_LAT}` : `${attemptedMinLat}`;
  const maxLat =
    attemptedMaxLat > MAX_LAT ? `${MAX_LAT}` : `${attemptedMaxLat}`;
  const minLong =
    attemptedMinLong < MIN_LONG ? `${MIN_LONG}` : `${attemptedMinLong}`;
  const maxLong =
    attemptedMaxLong > MAX_LONG ? `${MAX_LONG}` : `${attemptedMaxLong}`;

  return `${minLong.substring(0, 7)}%2C${minLat}%2C${maxLong}%2C${maxLat}`;
};

export const useSuggestions = () => {
  const { isLoading, categories } = useCategories();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [popupData] = useAtom(popupAtom);
  const { coordinates } = popupData?.eventLocation.location || {
    longitude: 0,
    latitude: 0,
  };

  useEffect(() => {
    if (
      isLoading ||
      !categories.length ||
      !popupData ||
      popupData?.isSuggestion
    )
      return;
    const { coordinates } = popupData?.eventLocation.location;
    const fetchSuggestions = async () => {
      const randomIndicies = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * categories.length),
      );

      const responses = await Promise.all(
        randomIndicies.map((index) => {
          const category = categories[index].canonical_id;

          const url = makeUrl(category, coordinates);
          return fetch(url);
        }),
      );

      const responseObjects = await Promise.all(
        responses.map((response) => response.json()),
      );
      // @ts-expect-error
      const features = [];
      responseObjects.forEach((responseObject) =>
        // @ts-expect-error
        responseObject.features.forEach((feature) => features.push(feature)),
      );

      // @ts-expect-error
      setSuggestions(features);
    };
    fetchSuggestions();
  }, [isLoading, categories, coordinates, popupData?.isSuggestion]);

  return { suggestions };
};
