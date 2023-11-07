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
      attributionControl: false,
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [location.lat, location.lng], // TODO: these values should probably come from global state or context
      zoom: 6
    });

    map.current.on('load', () => {
      map.current.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.current.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.current.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  // feature for Mapbox DC
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [
                      -77.03238901390978, 38.913188059745586
                    ]
                  },
                  'properties': {
                    'title': 'Mapbox DC'
                  }
                },
                {
                  // feature for Mapbox SF
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [-122.414, 37.776]
                  },
                  'properties': {
                    'title': 'Mapbox SF'
                  }
                }
              ]
            }
          });

          // Add a symbol layer
          map.current.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );
    });
  }, [])

  useEffect(() => {
    if (!map.current || !location) return; // wait for map to initialize

    // https://docs.mapbox.com/mapbox-gl-js/api/map/#flyto-parameters
    map.current.flyTo({
      center: [location.lat, location.lng],
    });

    // map.current.addSource('current-location', {
    //   'type': 'geojson',
    //   'data': {
    //     'type': 'FeatureCollection',
    //     'features': [
    //       {
    //         // feature for Mapbox DC
    //         'type': 'Feature',
    //         'geometry': {
    //           'type': 'Point',
    //           'coordinates': [
    //             location.lat, location.lng
    //           ]
    //         },
    //       },
    //     ]
    //   }
    // });

    // return () => {
    //   map.current?.removeSource('current-location');
    // }
  }, [location]);

  return <div ref={mapContainer} className={styles.mapContainer} />
}