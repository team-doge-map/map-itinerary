import { useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { LocationContext } from "../data/context/LocationContext";
import styles from './map.module.css';

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
    });
  }, [])

  return <div ref={mapContainer} style={{ flex: 1 }} />
}