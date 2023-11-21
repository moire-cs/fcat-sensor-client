import axios from 'axios';
import { PlotResponse } from '../../types/api/plots';

//TODO: This route is not implemented yet, but the types show what the response will look like
export const getPlots = async () => {
    const { data }:{data:PlotResponse[]} = await axios.get('/api/plots');
    return data;
};