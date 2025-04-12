// For Data
export interface IEarthQuakeLog {
    Depth: number;
    Timestamp: string;
    Longitude: number;
    Latitude: number;
    Location: string;
    Magnitude: number;
}

// For Components
export interface ILatestEarthQuakes {
    allEarthquakes: IEarthQuakeLog[];
}