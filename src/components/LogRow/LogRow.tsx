import './LogRow.scss';
import { ILogRow } from "../../utilities/interfaces.ts";
import { ErrorTag } from "@fremtind/jokul";
import LocationLink from "../LocationLink/LocationLink.tsx";
import { formatDate } from "../../utilities/helpers.ts";

const LogRow: React.FC<ILogRow> = ({ earthquakeLog }) => {
    const { Depth, Magnitude, Location, Timestamp, Longitude, Latitude } = earthquakeLog;

    return (
        <div className="logRow">
            <ErrorTag>{Magnitude}</ErrorTag>
            <div className="logRow__info">
                <div className="logRow__info__location">
                    <LocationLink location={Location} lat={Latitude} lon={Longitude} />
                </div>
                <div className="logRow__info__other">{formatDate(Timestamp)}, {Depth} km</div>
            </div>
        </div>
    );
};

export default LogRow;