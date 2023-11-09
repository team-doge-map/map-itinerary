import { FC } from "react";
import "./style.css";
import { TripDisplay, loader as tripLoader } from "./Trip/Trip";
import css from "./App.module.css";
import { TeamList } from "./team/Team";
import { MapProvider } from "react-map-gl";
import { Provider } from "jotai";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Trips } from "./Trips/Trips";
import { DogeMap } from "./dogemaps/DogeMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Trips />,
  },
  {
    path: "trip/:tripId",
    element: <TripDisplay />,
    // @ts-expect-error wtf react router
    loader: tripLoader,
  },
]);

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <Provider>
      <MapProvider>
        <div className={css.mapContainer}>
          <RouterProvider router={router} />
          <DogeMap />
          <TeamList />
        </div>
      </MapProvider>
    </Provider>
  );
};
