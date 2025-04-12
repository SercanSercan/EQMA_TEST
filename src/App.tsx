import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import LatestEarthQuakes from "./components/LatestEarthQuakes/LatestEarthQuakes.tsx";

function App() {
    const [allEarthquakes, SetAllEarthquakes] = useState<IEarthQuakeLog[]>([]);

    useEffect(() => {
        (async ()=> {
            const logs = await getEqLogs() ?? [];
            SetAllEarthquakes(logs);
        })();
    }, []);

    return (
        <div>
            <LatestEarthQuakes allEarthquakes={allEarthquakes} />
        </div>
    );
}

export default App
