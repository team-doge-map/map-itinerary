import Map, { Marker } from 'react-map-gl';
import { Trip } from "../data/mock/mockData";

export const DogeMap = ({ trip }: { trip: Trip }) => {
  const { details } = trip;
  const locations = details.map(detail => detail.location);

  return <Map
    id='dogeMap'
    mapboxAccessToken='pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg'
    initialViewState={{
      longitude: -93.17234701429481,
      latitude: 44.96006944733637,
      zoom: 14
    }}
    style={{ height: '100vh' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    {locations.map(location => <Marker longitude={location.lng} latitude={location.lat} anchor="bottom" key={`${location.lat}-${location.lng}`} draggable />)}
  </Map>
}