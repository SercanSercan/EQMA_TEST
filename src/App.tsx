import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import LatestEarthQuakes from "./components/LatestEarthQuakes/LatestEarthQuakes.tsx";
import TopFive from "./components/TopFive/TopFive.tsx";
import { Loader } from "@fremtind/jokul";

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [allEarthquakes, setAllEarthquakes] = useState<IEarthQuakeLog[]>([]);

    useEffect(() => {
        (async ()=> {
            try {
                const logs = await getEqLogs() ?? [];
                setAllEarthquakes(logs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="app">
            <h1>Eartquake Monitoring App (EQMA)</h1>
            {loading ? (
                <Loader
                    variant="large"
                    textDescription="Fetching EQMA Logs"
                />
            ): (
                <div className="app__cards">
                    <LatestEarthQuakes allEarthquakes={allEarthquakes} />
                    <TopFive allEarthquakes={allEarthquakes} />
                </div>
            )}
        </div>
    );
}

export default App
