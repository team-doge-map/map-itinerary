import styles from "./floating-panel.module.css";
import { atom, useSetAtom } from "jotai/index";
import { useAtom } from "jotai";

export const panelOpenAtom = atom(true);

export const FloatingPanel = ({ children }: React.PropsWithChildren) => {
  const [open, setIsOpen] = useAtom(panelOpenAtom);
  return (
    <div className={`${styles.floatingPanel} ${open ? styles.open : ""}`}>
      <button onClick={() => setIsOpen(!open)}>
        {open ? "close" : "open"}
      </button>
      {open && children}
    </div>
  );
};
