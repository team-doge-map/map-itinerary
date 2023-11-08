import { useTrip } from "../data/useTrip";
import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import { Link } from "react-router-dom";

export const Trips = () => {
  // just grab first trip for right now.
  const [trip, tripLoading] = useTrip("trip1");

  return (
    <>
      <FloatingPanel>
        <div>
          <h1>I AM THE TRIPS</h1>
          <Link to={"/trips"}>Click me to go to the trips page</Link>
        </div>
      </FloatingPanel>
    </>
  );
};
