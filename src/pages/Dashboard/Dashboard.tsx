import { DynamicPlotMap } from '@/components/maps/DynamicPlotMap';
import { DynamicPlotTable } from '@/components/tables/DynamicPlotTable';
import { Header } from '@/components/ui/header';
import { Plot } from '@/lib/types';
import { useState } from 'react';

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);

  return (
    <>
      <Header />
      <div className="flex justify-center ">
        <div className=" w-5/6 bg-white drop-shadow-lg  p-10 pt-0 mt-0 m-10">
          <h1 className="font-bold  tracking-tighter text-4xl pt-8">
            Dashboard
          </h1>
          <DynamicPlotMap
            setSelectedPlot={setSelectedPlot}
            selectedPlot={selectedPlot}
            plots={testPlots}
          />
          <DynamicPlotTable
            setSelectedPlot={setSelectedPlot}
            selectedPlot={selectedPlot}
            plots={testPlots}
          />
        </div>
      </div>
    </>
  );
};

const testPlots: Array<Plot> = [
  //plots should be randomly close to lat: 0.38965848016674315, lng: -79.68464785311586
  {
    id: '1',
    nodeID: '1',
    location: {
      //29.93654673278375, -90.12152118045245
      latitude: 29.93654673278375,
      longitude: -90.12152118045245,
    },
    description: 'plot1 description',
    alerts: ['Low Battery'],
  },
  {
    id: '2',
    nodeID: '2',
    location: {
      //29.936044552869703, -90.1228568038905
      latitude: 29.936044552869703,
      longitude: -90.1228568038905,
    },
    description: 'plot2 description',
    alerts: ['Unseen for 3 days, 4 hours'],
  },
  {
    id: '3',
    nodeID: '3',
    location: {
      //29.93710262064039, -90.12211926950171
      latitude: 29.93710262064039,
      longitude: -90.12211926950171,
    },
    description: 'plot3 description',
  },
  {
    id: '4',
    nodeID: '4',
    location: {
      //29.93576795494505, -90.12191474188661
      latitude: 29.93576795494505,
      longitude: -90.12191474188661,
    },
    description: 'plot4 description',
  },
];
