import { useObjectVal } from "react-firebase-hooks/database";
import { Trip } from "./mock/mockData";
import { getDatabase, ref } from "firebase/database";

export const useTrip = (tripId: string) => {
  const database = getDatabase();
  return useObjectVal<Trip>(ref(database, `trips/${tripId}`));
};
