import './LatestEarthQuakes.scss';
import { IEarthQuakeLog, ILatestEarthQuakes } from "../../utilities/interfaces.ts";
import LogRow from "../LogRow/LogRow.tsx";

const LatestEarthQuakes: React.FC<ILatestEarthQuakes> = ({ allEarthquakes }) => {
    return (
        <div className="latestEarthQuakes">
            <div className="latestEarthQuakes__list">
                {allEarthquakes.slice(0, 5).map((earthquake: IEarthQuakeLog, idx) => (
                    <LogRow earthquakeLog={earthquake} key={idx}/>
                ))}
            </div>
        </div>
    );
}

export default LatestEarthQuakes;