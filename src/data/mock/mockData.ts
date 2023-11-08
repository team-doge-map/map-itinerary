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
  address: Address;
  name: string;
};

export interface Event {
  locationId: string;
  order: number;
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
/*
export const SomeData: Trip = {
  tripId: 1,
  name: 'Team Doge Trip',
  startDate: '2024-01-01',
  endDate: '2024-01-04',
  itinerary: [{
    itineraryId: 1,
    date: '2024-01-01',
    tripEvent: [
      {
        eventId: 1,
        name: 'Jason & PB',
        location: {
          lat: 44.97469422531883,
          lng: -93.26381636989342,
          addressLine1: '600 Portland Ave S',
          addressLine2: 'Suite 100',
          city: 'Minneapolis',
          state: 'MN',
          zip: 55415
        },
      }, {
        eventId: 2,
        name: 'Kayti',
        location: {
          lat: 38.89829618066818,
          lng: -77.0365355033221,
          addressLine1: '1600 Pennsylvania Ave. NW',
          city: 'Washington',
          state: 'DC',
          zip: 20500
        },
      }, {
        eventId: 3,
        name: 'Dotty',
        location: {
          lat: 42.00139658499419,
          lng: -93.62239446768861,
          addressLine1: '2520 Airport Dr',
          city: 'Ames',
          state: 'IA',
          zip: 50010
        }
      }, {
        eventId: 4,
        name: 'Emily',
        location: {
          lat: 41.47261270852757,
          lng: -99.447509454434,
          addressLine1: '44977 Weissert Rd',
          city: 'Ansley',
          state: 'NE',
          zip: 68814
        }
      }
    ]
  }]
};
*/
