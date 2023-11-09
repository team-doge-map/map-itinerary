import { Coordinates } from "./mock/mockData";
import type {
  FillLayer,
  LineLayer,
  GeoJSONSource,
  MapGeoJSONFeature,
  MapboxGeoJSONFeature,
} from "react-map-gl";
import type { Feature, FeatureCollection } from "geojson";

const apiPrefix = "https://api.mapbox.com/directions/v5/mapbox/cycling/";
const apiAppend =
  "?geometries=geojson&access_token=pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg";

type StartEndCoordinates = {
  start: Coordinates;
  end: Coordinates;
};
export async function fetchRoute() {
  const start = [36.536758010740705, 138.14209989336888];
  const end = [36.74735619241161, 138.09219858902742];
  //longitude first
  const query = await fetch(
    `${apiPrefix}${start[1]},${start[0]};${end[1]},${end[0]}${apiAppend}`,
    { method: "GET" },
  );
  const json = await query.json();
  const routeData = json.routes[0];
  const coordinates = routeData.geometry.coordinates;
  const mapGeoJson: Feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  };
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [mapGeoJson],
  };
  return mapGeoJson;
}
