import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-93.17234701429481, 44.96006944733637], // TODO: these values should probably come from global state or context
      zoom: 20
    })
  }, [])

  return <div ref={mapContainer} style={{ height: '100vh', flex: 1 }} />
}