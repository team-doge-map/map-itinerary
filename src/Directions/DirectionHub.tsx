import { Location, EventLocations } from "../data/mock/mockData";
import { fetchRoute } from "../data/fetchRoute";
import { useState } from "react";

export function DirectionHub({ events }: { events: EventLocations[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((previousState) => !previousState);
    fetchRoute();
  };
  return (
    <>
      <button onClick={onClick}>Get directions</button>
      {isOpen && <div>open</div>}
    </>
  );
}
