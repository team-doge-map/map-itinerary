import { FC, useState, useEffect } from 'react';
import { Map } from './mapbox/Map';
import { Trips } from './Components/Trips';
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
    <div className={css.page}>
      <div className={css.pageContents}>
        <Trips />
        <div className={css.mapContainer}>
          <Map />
          {team && (
            <ul>
              {team.map(member => <li key={member}>{member}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
