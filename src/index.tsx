import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";

import { App } from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyCB9GndrB8MBPGEW0IyAzEZjQJkLPdzikI",
  authDomain: "doge-map-itinerary.firebaseapp.com",
  projectId: "doge-map-itinerary",
  storageBucket: "doge-map-itinerary.appspot.com",
  messagingSenderId: "22696822003",
  appId: "1:22696822003:web:f127603957cb4022446386",
  measurementId: "G-X38V3LRGN3",
  databaseURL: "https://doge-map-itinerary-default-rtdb.firebaseio.com",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// @ts-expect-error dumb
const root = createRoot(document.getElementById("app"));

root.render(
  <StrictMode>
    <App name="StackBlitz" />
  </StrictMode>
);
