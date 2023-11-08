import { useList } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import styles from "./team.module.css";

export function TeamList() {
  const database = getDatabase();
  const [snapshots, loading] = useList(ref(database, "team"));

  return (
    <div className={styles.team}>
      {loading && <span>Fetching team list...</span>}
      {!loading && snapshots && (
        <ul>
          {snapshots.map((value) => (
            <li key={value.key}>{value.key}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
