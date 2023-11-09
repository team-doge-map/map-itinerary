import { atom } from "jotai";
import { EventLocations } from "./mock/mockData";

// TODO: make this better - the state can probably be refactored and simplified
export const eventLocationsAtom = atom<EventLocations[]>([]);

type Popup = {
  linkTo?: string;
  eventLocation: EventLocations;
};
export const popupAtom = atom<Popup | null>(null);
