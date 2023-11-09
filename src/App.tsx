import { FC } from "react";
import "./style.css";
import { TripDisplay } from "./Trip/Trip";
import css from "./App.module.css";
import { TeamList } from "./team/Team";
import { MapProvider } from "react-map-gl";
import { Provider } from "jotai";
import {
  Route,
  RouteObject,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { Trips } from "./Trips/Trips";
import { DogeMap } from "./dogemaps/DogeMap";

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <Provider>
      <MapProvider>
        <div className={css.mapContainer}>
          <Routes>
            <Route index element={<Trips />} />
            <Route path="/trip/:tripId" element={<TripDisplay />} />
          </Routes>
          <DogeMap />
          <TeamList />
        </div>
      </MapProvider>
    </Provider>
  );
};
