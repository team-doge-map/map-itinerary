import styles from "./floating-panel.module.css";
import { atom, useSetAtom } from "jotai/index";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const panelOpenAtom = atom(true);

export const useClosePanel = () => {
  const setIsOpen = useSetAtom(panelOpenAtom);
  return useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
};

export const FloatingPanel = ({ children }: React.PropsWithChildren) => {
  const [open, setIsOpen] = useAtom(panelOpenAtom);
  return (
    <div className={`${styles.floatingPanel} ${open ? styles.open : ""}`}>
      <button className={styles.button} onClick={() => setIsOpen(!open)}>
        {open ? "close" : "open"}
      </button>
      {open && children}
    </div>
  );
};
