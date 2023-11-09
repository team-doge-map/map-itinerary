export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Location = {
  coordinates: Coordinates;
  address?: Address;
  name: string;
};

export interface Event {
  locationId: string;
  order?: number;
  startDateTime?: string;
  endDateTime?: string;
}
export interface EventLocations extends Event {
  location: Location;
  eventId: string;
}

export type Itinerary = {
  itineraryId: number;
  date: string;
  events: Record<string, Event>;
};
export type Trip = {
  name: string;
  startDate: string;
  endDate: string;
  coordinates: Coordinates;
  itineraries: Record<string, Itinerary>;
};

export type Suggestion = {
  id: string;
  center: number[];
  text_en: string;
  place_name_en: string;
};
