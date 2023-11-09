import styles from "./floating-panel.module.css";
import { atom, useSetAtom } from "jotai/index";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { useWindowSize } from "react-use";

export const panelOpenAtom = atom(true);

export const useClosePanel = () => {
  const setIsOpen = useSetAtom(panelOpenAtom);
  return useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
};

export const FloatingPanel = ({ children }: React.PropsWithChildren) => {
  const [open, setIsOpen] = useAtom(panelOpenAtom);
  const { width, height } = useWindowSize();

  const isDesktop = width > 800;

  return (
    <div
      className={`${styles.floatingPanel} ${
        open || isDesktop ? styles.open : ""
      }`}
    >
      {!isDesktop && (
        <button className={styles.button} onClick={() => setIsOpen(!open)}>
          {open ? "close" : "open"}
        </button>
      )}

      {(open || isDesktop) && children}
    </div>
  );
};
