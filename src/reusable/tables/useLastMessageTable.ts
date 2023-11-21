import axios from 'axios';
import { getLastMessages } from '../routes/messageRoutes';
import { getPlots } from '../routes/plotRoutes';
import { nodeIDToPlotMapper } from '../hooks/nodeIDToPlotMapper';

export const getLastMessagesColumns = () => [
    {
        title: 'Node ID',
        field: 'nodeId',
    },
    {
        title:'Plot',
        field:'plotDescription',
    },
    {
        title: 'Soil Conductivity',
        field: 'soilConductivity',
    },
    {
        title: 'Temperature',
        field: 'temperature',
    },
    {
        title: 'Sunlight',
        field: 'sunlight',
    },

    {
        title: 'Humidity',
        field: 'humidity',
    },
    {
        title: 'Battery',
        field: 'battery',
    },
    {
        title:'Time',
        field:'time',
    },
];

export const getLastMessagesData = async () => {
    const lastMessages = await getLastMessages();
    const plots = await getPlots();

    const nodeIDToPlotMap = nodeIDToPlotMapper(plots);

    const lastMessagesData = lastMessages.map((message) => {
        const plot = nodeIDToPlotMap.get(message.nodeID);
        return {
            nodeId: message.nodeID,
            plotDescription: plot?.description,
            soilConductivity: message.soilConductivity,
            temperature: message.temperature,
            sunlight: message.sunlight,
            humidity: message.humidity,
            battery: message.battery,
            time: message.time,
        };
    });
};

