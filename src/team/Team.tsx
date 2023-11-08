import { useListKeys } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import styles from "./team.module.css";

export function TeamList() {
  const database = getDatabase();
  const [teamKeys, loading] = useListKeys(ref(database, "team"));

  return (
    <div className={styles.team}>
      {loading && <span>Fetching team list...</span>}
      {!loading && teamKeys && (
        <ul>
          {teamKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
