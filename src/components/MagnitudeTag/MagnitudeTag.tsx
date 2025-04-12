import { IMagnitudeTag } from "../../utilities/interfaces.ts";
import { ErrorTag, InfoTag, SuccessTag, Tag, WarningTag } from "@fremtind/jokul";

/*
*   Under 2             => Green    micro
    Between 2, 4        => Gray     minor
    Between 4, 5.5      => Blue     moderate
    Between 5.5, 6.4    => Yellow   strong
    Over 6.4            => Red      major
* */
const MagnitudeTag: React.FC<IMagnitudeTag> = ({ magnitude }) => {

    if (magnitude < 2) {                                // Green    micro
        return <SuccessTag>{magnitude}</SuccessTag>;
    } else if (magnitude >= 2 && magnitude < 4) {       // Gray     minor
        return <Tag>{magnitude}</Tag>;
    } else if (magnitude >= 4 && magnitude < 5.5) {     // Blue     moderate
        return <InfoTag>{magnitude}</InfoTag>;
    } else if (magnitude >= 5.5 && magnitude < 6.4) {   // Yellow   strong
        return <WarningTag>{magnitude}</WarningTag>;
    } else {                                            // Red      major
        return <ErrorTag>{magnitude}</ErrorTag>;
    }
};

export default MagnitudeTag;