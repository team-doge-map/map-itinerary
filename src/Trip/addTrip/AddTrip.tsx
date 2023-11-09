import { FloatingPanel } from "../../shared/FloatingPanel/FloatingPanel";
import { useForm, SubmitHandler } from "react-hook-form";
import { Marker, useMap } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import styles from "./addTrip.module.css";
import { getDatabase, ref, child, push, update } from "firebase/database";

type AddTripForm = {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
};

type Itinerary = {
  date: string;
  location?: Location;
};

const access_token =
  "access_token=pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg";

const makeUrl = (destination: string) => {
  const location = encodeURIComponent(destination);
  const mahURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?${access_token}`;

  return mahURL;
};

export const AddTrip = () => {
  const database = getDatabase();
  const navigate = useNavigate();
  const { dogeMap } = useMap();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddTripForm>();

  const onSubmit: SubmitHandler<AddTripForm> = async (data) => {
    const url = makeUrl(data.destination);
    const response = await fetch(url);
    const responseObjects = await response.json();
    const center = responseObjects?.features?.[0]?.center;

    const newPostKey = push(child(ref(database), "trips")).key;
    const updates = {
      [`/trips/${newPostKey}`]: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        coordinates: {
          latitude: center[1],
          longitude: center[0],
        },
        itineraries: {
          itinerary1: {
            date: data.startDate,
          },
        },
      },
    };

    update(ref(database), updates);
    return navigate(-1);
  };

  const backToTrips = () => {
    navigate(-1);
  };

  return (
    <>
      <FloatingPanel>
        <form className={styles.addTripForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Trip Name:</p>
            <input {...register("name", { required: true })} />
          </div>
          <div>
            <p>Start date:</p>
            <input type="date" {...register("startDate", { required: true })} />
          </div>
          <div>
            <p>End date:</p>
            <input type="date" {...register("endDate", { required: true })} />
          </div>
          <div>
            <p>Destination:</p>
            <input {...register("destination", { required: true })} />
          </div>
          <input type="submit" />
        </form>
        <button className={styles.backToTrips} onClick={() => backToTrips()}>
          Back to trips
        </button>
      </FloatingPanel>
    </>
  );
};
