import { DynamicPlotMap } from '@/components/maps/DynamicPlotMap';
import { DynamicPlotTable } from '@/components/tables/DynamicPlotTable';
import { Header } from '@/components/ui/header';
import { Plot } from '@/lib/types';
import { useState } from 'react';

export const Dashboard = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Header />
      <div className="flex justify-center ">
        <div className=" w-5/6 bg-white drop-shadow-lg  p-10 pt-0 mt-0 m-10">
          <h1 className="font-bold  tracking-tighter text-4xl pt-8">
            Dashboard
          </h1>
          <DynamicPlotMap plots={testPlots} />
          <DynamicPlotTable plots={testPlots} />
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
      latitude: 0.38955848016674315,
      longitude: -79.68464785311586,
    },
    description: 'plot1 description',
    alerts: ['Low Battery'],
  },
  {
    id: '2',
    nodeID: '2',
    location: {
      latitude: 0.38945848016674315,
      longitude: -79.68464785311586,
    },
    description: 'plot2 description',
    alerts: ['Unseen for 3 days, 4 hours'],
  },
  {
    id: '3',
    nodeID: '3',
    location: {
      latitude: 0.38962848016674315,
      longitude: -79.68464785311586,
    },
    description: 'plot3 description',
  },
  {
    id: '4',
    nodeID: '4',
    location: {
      latitude: 0.38965848016674315,
      longitude: -79.68464785311586,
    },
    description: 'plot4 description',
  },
];
