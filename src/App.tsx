import { FC, useState, useEffect } from 'react';
import './style.css';
import { Trip } from './Trip/Trip';
import { LocationContext } from './data/context/LocationContext';
import css from './App.module.css'
import { fetchTeam } from './data';

export const App: FC<{ name: string }> = ({ name }) => {
  const [location, setLocation] = useState({ lat: -93.17234701429481, lng: 44.96006944733637 })
  const [team, setTeam] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchTeam();
      setTeam(data);
    }
    fetchData();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <div className={css.mapContainer}>
        <Trip />
      </div>
      <div className={css.teams}>
        {team && (
          <ul>
            {team.map(member => <li key={member}>{member}</li>)}
          </ul>
        )}
      </div>
    </LocationContext.Provider>
  );
};
