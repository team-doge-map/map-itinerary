export const FloatingPanel = ({ children }: React.PropsWithChildren) => {

  return <div style={{ position: 'absolute', zIndex: 100, padding: '1rem', backgroundColor: 'white', left: '2rem', top: '2rem', width: '20%' }}>{children}</div>
}