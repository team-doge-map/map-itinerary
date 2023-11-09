import { atom } from "jotai";
import { EventLocations } from "./mock/mockData";

// TODO: make this better - the state can probably be refactored and simplified
type EventLocationState = EventLocations & {
  linkTo?: string;
};
export const eventLocationsAtom = atom<EventLocationState[]>([]);

type Popup = {
  linkTo?: string;
  state?: { [key: string]: any };
  isSuggestion?: boolean;
  eventLocation: EventLocations;
};
export const popupAtom = atom<Popup | null>(null);
