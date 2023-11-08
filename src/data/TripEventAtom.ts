import { atom } from "jotai";
import { EventLocations } from "./mock/mockData";

export const tripEventAtom = atom<EventLocations | null>(null);
