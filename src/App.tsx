import { FC } from 'react';
import './style.css';
import { Map } from './mapbox/Map';
import css from './App.module.css'

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div style={css.mapContainer}>
      <Map />
    </div>
  );
};
