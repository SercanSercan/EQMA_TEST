import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";

function App() {
    const [eqLogs, SetEqLogs] = useState<IEarthQuakeLog[]>([]);

    useEffect(() => {
        (async ()=> {
            const logs = await getEqLogs() ?? [];
            SetEqLogs(logs);
        })();
    }, []);

    return (
        <div>
            {eqLogs.map((log, idx) => (
                <p key={idx}>{log.Location} {log.Magnitude}</p>
            ))}
        </div>
    );
}

export default App
