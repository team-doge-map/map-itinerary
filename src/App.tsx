import { FC } from "react";
import "./style.css";
import { TripDisplay } from "./Trip/Trip";
import css from "./App.module.css";
import { TeamList } from "./team/Team";
import { MapProvider } from "react-map-gl";
import { Helmet } from "react-helmet";

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <Helmet>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Helmet>

      <MapProvider>
        <div className={css.mapContainer}>
          <TripDisplay />
        </div>
        <TeamList />
      </MapProvider>
    </>

    // foo

    // try again

    // bar
  );
};
