import { FloatingPanel } from "../../shared/FloatingPanel/FloatingPanel";
import { useForm, SubmitHandler } from "react-hook-form";
import { Marker, useMap } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, push, update } from "firebase/database";

type AddTripForm = {
  name: string;
  startDate: string;
  endDate: string;
  coordinates: Coordinates;
};

type Coordinates = {
  latitude: string;
  longitude: string;
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
  const onSubmit: SubmitHandler<AddTripForm> = (data) => {
    const newPostKey = push(child(ref(database), "trips")).key;
    const updates = {
      [`/trips/${newPostKey}`]: {
        ...data,
        coordinates: {
          latitude: "37.5519",
          longitude: "126.9918",
        },
        itineraries: {},
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Trip Name:</p>
          <input {...register("name", { required: true })} />
          <p>Start date:</p>
          <input type="date" {...register("startDate", { required: true })} />
          <p>End date:</p>
          <input type="date" {...register("endDate", { required: true })} />
          <input type="submit" />
        </form>
        <button onClick={() => backToTrips()}>Back to trips</button>
      </FloatingPanel>
    </>
  );
};
