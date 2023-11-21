import { PlotResponse } from '../../types/api/Plots';

export const nodeIDToPlotMapper = (plots:PlotResponse[]) => {
    const nodeIDToPlotMap = new Map<string, PlotResponse>();
    plots.forEach((plot) => {
        nodeIDToPlotMap.set(plot.nodeID, plot);
    });
    return nodeIDToPlotMap;
};
