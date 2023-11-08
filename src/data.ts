import { getDatabase, get, child, ref } from "firebase/database";

export const fetchTeam = async () => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `team`));
  if (snapshot.exists()) {
    return Object.keys(snapshot.val());
  }
  return undefined;








  
};
