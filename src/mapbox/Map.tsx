import { useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { LocationContext } from "../data/context/LocationContext";

mapboxgl.accessToken = 'pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const { location, setLocation } = useContext(LocationContext);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [location.lat, location.lng], // TODO: these values should probably come from global state or context
      zoom: 20
    })
  }, [])

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.flyTo({
      center: [location.lat, location.lng],
      speed: 2, // default is 1.2 https://docs.mapbox.com/mapbox-gl-js/api/map/#flyto-parameters
    });

    new mapboxgl.Marker().setLngLat([location.lat, location.lng]).addTo(map.current);
  }, [location]);

  return <div ref={mapContainer} style={{ height: '100vh', flex: 1 }} />
}