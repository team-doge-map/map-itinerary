import { useContext } from "react"
import { Map } from "../mapbox/Map"
import { FloatingPanel } from "../shared/FloatingPanel"
import { LocationContext } from "../data/context/LocationContext"

// dummy data
type Location = {
  lat: number;
  lng: number;
}
type TripDetail = {
  id: number;
  name: string;
  location: Location;
}
type Trip = {
  id: number;
  title: string;
  details: TripDetail[];
}
const SomeData: Trip = {
  id: 1,
  title: 'Team Doge Trip',
  details: [{
    id: 1,
    name: 'Jason & PB',
    location: { lng: 44.97633628404647, lat: -93.27108181850353 },
  }, {
    id: 2,
    name: 'Kayti',
    location: { lng: 38.90738089208926, lat: -77.03849314391424 },
  }, {
    id: 3,
    name: 'Dotty',
    location: { lng: 41.99319095113293, lat: -93.55213597729579 }
  }, {
    id: 4,
    name: 'Emily',
    location: { lng: 41.502165559549056, lat: -99.38242343473735 }
  }]
};

export const Trip = () => {
  const { setLocation } = useContext(LocationContext);
  const onSelectDetail = (location: TripDetail) => {
    setLocation(location.location);
  }

  return <>
    <FloatingPanel >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>{SomeData.title}</h2>
        {SomeData.details.map(detail => {
          return <button key={detail.id} onClick={() => onSelectDetail(detail)}>
            <h3>{detail.name}</h3>
          </button>
        })}
      </div>
    </FloatingPanel >
    <Map />
  </>
}