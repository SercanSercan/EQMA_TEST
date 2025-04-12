import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import LatestEarthQuakes from "./components/LatestEarthQuakes/LatestEarthQuakes.tsx";
import TopFive from "./components/TopFive/TopFive.tsx";

function App() {
    const [allEarthquakes, SetAllEarthquakes] = useState<IEarthQuakeLog[]>([]);

    useEffect(() => {
        (async ()=> {
            const logs = await getEqLogs() ?? [];
            SetAllEarthquakes(logs);
        })();
    }, []);

    return (
        <div className="app">
            <h1>Eartquake Monitoring App (EQMA)</h1>
            <div className="app__cards">
                <LatestEarthQuakes allEarthquakes={allEarthquakes} />
                <TopFive allEarthquakes={allEarthquakes} />
            </div>
        </div>
    );
}

export default App
