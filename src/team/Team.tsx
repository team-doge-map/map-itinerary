import { useListKeys } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import styles from "./team.module.css";

export function TeamList() {
  const database = getDatabase();
  const [teamKeys, loading] = useListKeys(ref(database, "team"));

  return (
    <div className={styles.team}>
      {loading && <span>Fetching team list...</span>}
      {!loading &&
        teamKeys &&
        teamKeys.map((key) => (
          <sub key={key} className={styles.name}>
            {key}
          </sub>
        ))}
    </div>
  );
}
