import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { Trip } from "./mock/mockData";

// dunno what this would be but the return type of calling useObjectVal for 'trips' is this thing
type FirebaseTrip = {
  [key: string]: Trip;
};

export const useTrips = () => {
  const database = getDatabase();
  return useObjectVal<FirebaseTrip>(ref(database, `trips`));
};
