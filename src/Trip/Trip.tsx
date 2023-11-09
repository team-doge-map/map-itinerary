import { FloatingPanel } from "../shared/FloatingPanel/FloatingPanel";
import { TripPanel } from "./TripPanel";
import { useAtom } from "jotai";
import { newMarkerAtom } from "../data/state";
import { NewMarkerPanel } from "./NewMarkerPanel";

export const Trip = () => {
  const [newMarker] = useAtom(newMarkerAtom);

  return (
    <FloatingPanel>
      {newMarker ? <NewMarkerPanel /> : <TripPanel />}
    </FloatingPanel>
  );
};
