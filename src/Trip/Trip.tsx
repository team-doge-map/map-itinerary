import { useContext, useState } from "react"
import { Map } from "../mapbox/Map"
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel"
import { LocationContext } from "../data/context/LocationContext"
import styles from './trip.module.css';

// dummy data
type Location = {
  lat: number;
  lng: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: number;
}
type TripEvent = {
  eventId: number;
  name: string;
  location: Location;
}
type Itinerary = {
  itineraryId: number;
  date: string;
  tripEvent: TripEvent[];
}
type Trip = {
  tripId: number;
  name: string;
  startDate: string;
  endDate: string;
  itinerary: Itinerary[];
}
const SomeData: Trip = {
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
          lng: 44.97469422531883,
          lat: -93.26381636989342,
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
          lng: 38.89829618066818,
          lat: -77.0365355033221,
          addressLine1: '1600 Pennsylvania Ave. NW',
          city: 'Washington',
          state: 'DC',
          zip: 20500
        },
      }, {
        eventId: 3,
        name: 'Dotty',
        location: {
          lng: 42.00139658499419,
          lat: -93.62239446768861,
          addressLine1: '2520 Airport Dr',
          city: 'Ames',
          state: 'IA',
          zip: 50010
        }
      }, {
        eventId: 4,
        name: 'Emily',
        location: {
          lng: 41.47261270852757,
          lat: -99.447509454434,
          addressLine1: '44977 Weissert Rd',
          city: 'Ansley',
          state: 'NE',
          zip: 68814
        }
      }
    ]
  }]
};

const Details = ({ location }: { location: Location }) => (
  <div className={styles.details}>
    <h5>Address:</h5>
    <p>{location.addressLine1}</p>
    {location.addressLine2 && (<p>{location.addressLine2}</p>)}
    <p>{location.city}, {location.state} {location.zip}</p>
  </div>
)

export const Trip = () => {
  const { setLocation } = useContext(LocationContext);
  const [expandedDetail, setExpandedDetail] = useState(0);
  const onSelectDetail = (event: TripEvent) => {
    setLocation(event.location);
    setExpandedDetail(event.eventId);
  };

  return (
    <>
      <FloatingPanel>
        <div className={styles.trip}>
          <div>
            <h2>{SomeData.name}</h2>
            <h3>{SomeData.itinerary[0].date}</h3>
          </div>
          {SomeData.itinerary[0].tripEvent.map(detail => (
            <>
              <button key={detail.eventId} onClick={() => onSelectDetail(detail)}>
                <h3>{detail.name}</h3>
              </button>
              {expandedDetail === detail.eventId && (
                <Details location={detail.location} />
              )}
            </>
          ))}
        </div>
      </FloatingPanel>
      <Map />
    </>
  )
}