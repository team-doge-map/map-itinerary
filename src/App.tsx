import { FC } from 'react';
import './style.css';
import { Map } from './mapbox/Map';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <Map />
    </div>
  );
};
