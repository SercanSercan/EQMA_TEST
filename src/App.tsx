import './App.scss';
import { useEffect, useState } from "react";
import { getEqLogs } from "./utilities/api.ts";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import { ErrorTag } from "@fremtind/jokul";

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
                <p key={idx}>{log.Location} <ErrorTag>{log.Magnitude}</ErrorTag></p>
            ))}
        </div>
    );
}

export default App
