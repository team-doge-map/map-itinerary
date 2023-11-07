import { FC } from 'react';
import './style.css';
import { Trip } from './Trip/Trip';
import css from './App.module.css'
import { TeamList } from './team/Team';
import { MapProvider } from 'react-map-gl';

export const App: FC<{ name: string }> = ({ name }) => {

  return (
    <MapProvider>
      <div className={css.mapContainer}>
        <Trip />
      </div>
      <TeamList />
    </MapProvider>
  );
};
