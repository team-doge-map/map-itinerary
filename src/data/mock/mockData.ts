// this probably isn't the correct domain object given our design
export type Location = {
  lat: number;
  lng: number;
}
export type TripWithLocations = {
  locations: Location[]
}
export type TripDetail = {
  id: number;
  name: string;
  location: Location;
}
export type Trip = {
  id: number;
  title: string;
  details: TripDetail[];
}

export const SomeData: Trip = {
  id: 1,
  title: 'Team Doge Trip',
  details: [{
    id: 1,
    name: 'Jason & PB',
    location: { lat: 44.97633628404647, lng: -93.27108181850353 },
  }, {
    id: 2,
    name: 'Kayti',
    location: { lat: 38.90738089208926, lng: -77.03849314391424 },
  }, {
    id: 3,
    name: 'Dotty',
    location: { lat: 41.99319095113293, lng: -93.55213597729579 }
  }, {
    id: 4,
    name: 'Emily',
    location: { lat: 41.502165559549056, lng: -99.38242343473735 }
  }]
};