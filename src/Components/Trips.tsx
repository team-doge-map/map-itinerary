import TripsCss from './Trips.module.css';

const TRIPS = [
    { name: 'Japan', location: 0, description: '' },
    { name: 'South Korea', location: 0, description: '' },
    { name: 'Portugal', location: 0, description: '' }
];

export const Trips = () => {
    const createTrip = () => {
        console.log('hello :)');
    };

    const selectTrip = (name: string) => {
        console.log('trip!', name);
    };

    return (
        <div className={TripsCss.tripContainer}>
            <div>
                <h1 className={TripsCss.tripHeader}>All Mah Trips</h1>
                <ul className={TripsCss.tripList}>
                    {TRIPS.map((trip) => (
                        <button key={trip.name} onClick={() => selectTrip(trip.name)}>
                            {trip.name}
                        </button>
                    ))}
                </ul>
            </div>
            <button onClick={createTrip}>Create a Trip</button>
        </div>
    )
};