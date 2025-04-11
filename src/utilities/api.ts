import axios from 'axios';
import { IEarthQuakeLog } from "./interfaces.ts";

export const getEqLogs = async () => {
    const response = await axios.get<IEarthQuakeLog[]>(
        'https://q4fzp6xm48.execute-api.eu-north-1.amazonaws.com/prod/get-earthquakes'
    );
    return response.data;
};
