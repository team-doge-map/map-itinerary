import { atom } from "jotai";
import { TripEvent } from "./mock/mockData";

export const tripEventAtom = atom<TripEvent | null>(null);
