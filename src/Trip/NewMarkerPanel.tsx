import { useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import { newMarkerAtom } from "../data/state";
import css from "./NewMarkerPanel.module.css";

export const NewMarkerPanel = () => {
  const [newMarker, setNewMarker] = useAtom(newMarkerAtom);
  const [editMarker, setEditMarker] = useState(newMarker);

  useEffect(() => {
    setEditMarker(newMarker);
  }, [newMarker]);

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        // e.target.setNewMarker(editMarker);
        // @ts-ignore
        setNewMarker(editMarker);
      }}
    >
      <label className={css.label}>
        name
        <input
          className={css.input}
          type="text"
          name="name"
          value={editMarker?.location.name}
          onChange={(event) => {
            const { name, value } = event.target;
            // @ts-ignore
            setEditMarker({
              ...editMarker,
              location: { ...editMarker.location, name: value },
            });
          }}
        />
      </label>

      <input className={css.save} type="submit" value="Save" />
    </form>
  );
};
