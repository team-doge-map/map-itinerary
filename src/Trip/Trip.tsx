import { SomeData, TripDetail } from "../data/mock/mockData";
import { DogeMap } from "../mapbox/DogeMap"
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel"
import styles from './trip.module.css';
import { useMap } from "react-map-gl";

export const Trip = () => {
  const { dogeMap } = useMap();

  const onSelectLocation = (detail: TripDetail) => {
    // TODO: highlight the button or something? maybe move the map to this location? 
    dogeMap.flyTo({
      center: [detail.location.lng, detail.location.lat],
    });
  }

  return <>
    <FloatingPanel >
      <div className={styles.trip}>
        <h2>{SomeData.title}</h2>
        {SomeData.details.map(detail => {
          return <button key={detail.id} onClick={() => onSelectLocation(detail)}>
            <h3>{detail.name}</h3>
          </button>
        })}
      </div>
    </FloatingPanel >
    <DogeMap trip={SomeData} />
  </>
}