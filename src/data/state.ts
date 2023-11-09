import { atom } from "jotai";
import { EventLocations } from "./mock/mockData";

// TODO: make this better - the state can probably be refactored and simplified
export const eventLocationsAtom = atom<EventLocations[]>([]);

type Popup = {
  linkTo?: string;
  state?: { [key: string]: any };
  eventLocation: EventLocations;
};
export const popupAtom = atom<Popup | null>(null);

export const newMarkerAtom = atom<EventLocations | null>(null);
