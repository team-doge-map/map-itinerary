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
      zoom: 6
    })
  }, [])

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    // https://docs.mapbox.com/mapbox-gl-js/api/map/#flyto-parameters
    map.current.flyTo({
      center: [location.lat, location.lng],
    });
  }, [location]);

  return <div ref={mapContainer} style={{ height: '100vh', flex: 1 }} />
}