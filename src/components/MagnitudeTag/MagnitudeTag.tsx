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

    let magStr = magnitude.toString();
    if (magStr.length === 1) {
        magStr = magStr + ".0";
    }

    const mag = parseFloat(magStr);

    if (mag < 2) {                                  // Green    micro
        return <SuccessTag>{magStr}</SuccessTag>;
    } else if (mag >= 2 && mag < 4) {               // Gray     minor
        return <Tag>{magStr}</Tag>;
    } else if (mag >= 4 && mag < 5.5) {             // Blue     moderate
        return <InfoTag>{magStr}</InfoTag>;
    } else if (mag >= 5.5 && mag < 6.4) {           // Yellow   strong
        return <WarningTag>{magStr}</WarningTag>;
    } else {                                        // Red      major
        return <ErrorTag>{magStr}</ErrorTag>;
    }
};

export default MagnitudeTag;