import { FC, useState } from 'react';
import './style.css';
import { Trip } from './Trip/Trip';
import { LocationContext } from './data/context/LocationContext';

export const App: FC<{ name: string }> = ({ name }) => {
  const [location, setLocation] = useState({ lat: -93.17234701429481, lng: 44.96006944733637 })

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <div style={{ display: 'flex' }}>
        <Trip />
      </div>
    </LocationContext.Provider>
  );
};
