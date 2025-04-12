import './LatestEarthQuakes.scss';
import { IEarthQuakeLog, ILatestEarthQuakes } from "../../utilities/interfaces.ts";

const LatestEarthQuakes: React.FC<ILatestEarthQuakes> = ({ allEarthquakes }) => {
    return (
        <div className="latestEarthQuakes">
            {allEarthquakes.slice(0, 5).map((earthquake: IEarthQuakeLog, idx) => {
                const { Location } = earthquake;
                return (<div>{Location}</div>);
            })}
        </div>
    );
}

export default LatestEarthQuakes;