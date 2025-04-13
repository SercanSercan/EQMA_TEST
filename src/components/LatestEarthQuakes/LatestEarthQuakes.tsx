import './LatestEarthQuakes.scss';
import { IEarthQuakeLog, ILatestEarthQuakes } from "../../utilities/interfaces.ts";
import LogRow from "../LogRow/LogRow.tsx";
import { LIMIT } from "../../utilities/constants.ts";

const LatestEarthQuakes: React.FC<ILatestEarthQuakes> = ({ allEarthquakes }) => {
    return (
        <div className="latestEarthQuakes">
            <h2>Latest Earthquakes</h2>
            <div className="latestEarthQuakes__list">
                {allEarthquakes.slice(0, LIMIT).map((earthquake: IEarthQuakeLog, idx) => (
                    <LogRow earthquakeLog={earthquake} key={idx}/>
                ))}
            </div>
        </div>
    );
}

export default LatestEarthQuakes;