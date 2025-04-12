import './LatestEarthQuakes.scss';
import { IEarthQuakeLog, ILatestEarthQuakes } from "../../utilities/interfaces.ts";
import { TextInput } from "@fremtind/jokul";
import { useState } from "react";

const LatestEarthQuakes: React.FC<ILatestEarthQuakes> = ({ allEarthquakes }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="latestEarthQuakes">
            <TextInput
                label=""
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                name="search-box"
                placeholder="Search..."
                labelProps={{ variant: "small" }}
            />
            {allEarthquakes.slice(0, 5).map((earthquake: IEarthQuakeLog, idx) => {
                const { Location } = earthquake;
                return (<div key={idx}>{Location}</div>);
            })}
        </div>
    );
}

export default LatestEarthQuakes;