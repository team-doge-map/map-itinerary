import { FC, useState, useEffect } from 'react';
import './style.css';
import { Map } from './mapbox/Map';
import css from './App.module.css'
import { fetchTeam } from './data';

export const App: FC<{ name: string }> = ({ name }) => {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchTeam();
      setTeam(data);
    }
    fetchData();
  }, []);
  return (
    <div className={css.mapContainer}>
      <Map />
      {team && (
        <ul>
          {team.map(member => <li key={member}>{member}</li>)}
        </ul>
      )}
    </div>
  );
};
