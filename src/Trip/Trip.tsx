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
  title: 'Doge Trip',
  details: [{
    id: 1,
    name: 'Doge Pizza',
    location: { lng: 44.96006944733637, lat: -93.17234701429481 },
  }, {
    id: 2,
    name: 'Doge, HU',
    location: { lng: 48.260162604985524, lat: 22.06909350585474 },
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