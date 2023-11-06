import styles from './floating-panel.module.css';

export const FloatingPanel = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.floatingPanel}>{children}</div>
}