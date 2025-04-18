import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import LatestEarthQuakes from "./components/LatestEarthQuakes/LatestEarthQuakes.tsx";
import TopFive from "./components/TopFive/TopFive.tsx";
import { ErrorMessage, Loader } from "@fremtind/jokul";

function App() {
    const [allEarthquakes, setAllEarthquakes] = useState<IEarthQuakeLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        (async ()=> {
            try {
                const logs = await getEqLogs() ?? [];
                setAllEarthquakes(logs);
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="app">
            <header>
                <h1>Eartquake Monitoring App (EQMA)</h1>
            </header>
            <main>
            {loading && (
                <Loader
                    variant="large"
                    textDescription="Fetching EQMA Logs"
                />
            )}
            {!loading && !isError && (
                <div className="app__cards">
                    <LatestEarthQuakes allEarthquakes={allEarthquakes} />
                    <TopFive allEarthquakes={allEarthquakes} />
                </div>
            )}
            {isError && (
                <ErrorMessage
                    fullWidth={false}
                    dismissed={false}
                >Our service is down 😔</ErrorMessage>
            )}
            </main>
            <footer>
                The Earthquake logs on this website are collected from <a href="http://www.koeri.boun.edu.tr/scripts/lst9.asp">Kandilli Observatory</a>.
            </footer>
        </div>
    );
}

export default App
