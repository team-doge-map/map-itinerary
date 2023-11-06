import { FC } from 'react';
import './style.css';
import { Map } from './mapbox/Map';
import css from './App.module.css'
import { TeamList } from './ExampleTeam';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div className={css.mapContainer}>
      <Map />
      <TeamList />
    </div>
  );
};
