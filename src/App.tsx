import { FC, useState } from 'react';
import './style.css';
import { Trip } from './Trip/Trip';
import { LocationContext } from './data/context/LocationContext';
import css from './App.module.css'

export const App: FC<{ name: string }> = ({ name }) => {
  const [location, setLocation] = useState({ lat: -93.17234701429481, lng: 44.96006944733637 })

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <div className={css.mapContainer}>
        <Trip />
      </div>
    </LocationContext.Provider>
  );
};
