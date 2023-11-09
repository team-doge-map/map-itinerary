import { useAtom } from "jotai";
import { popupAtom } from "../data/state";
import { Popup } from "react-map-gl";
import { useNavigate } from "react-router-dom";

export const DogePopup = () => {
  const [popupData, setPopup] = useAtom(popupAtom);
  const navigate = useNavigate();

  if (!popupData) return null;

  const onNavigate = () => {
    setPopup(null);
    navigate(popupData?.linkTo || "");
  };
  return (
    popupData && (
      <Popup
        anchor="top"
        longitude={Number(
          popupData.eventLocation.location.coordinates.longitude,
        )}
        latitude={Number(popupData.eventLocation.location.coordinates.latitude)}
        onClose={() => setPopup(null)}
        closeButton={false}
      >
        <div>
          {popupData.linkTo ? (
            <button onClick={() => onNavigate()}>
              {popupData.eventLocation.location.name}
            </button>
          ) : (
            <span>{popupData.eventLocation.location.name}</span>
          )}
        </div>
        <div>{popupData.eventLocation.location.address?.address1}</div>
        <div>{popupData.eventLocation.location.address?.address2}</div>
        <div>
          {popupData.eventLocation.location.address?.city
            ? `${popupData.eventLocation.location.address?.city}, `
            : ""}
          {popupData.eventLocation.location.address?.state ??
            popupData.eventLocation.location.address?.country}{" "}
          {popupData.eventLocation.location.address?.postalCode}
        </div>
      </Popup>
    )
  );
};
