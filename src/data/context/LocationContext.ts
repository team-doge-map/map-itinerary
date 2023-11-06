import { createContext } from "react";

export const LocationContext = createContext({
  location: {
    lat: 0,
    lng: 0,
  },
  setLocation: (location: { lat: number; lng: number }) => { },
});
