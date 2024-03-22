import { DynamicPlotMap } from '@/components/maps/DynamicPlotMap';
import { Header } from '@/components/ui/header';
import { Plot } from '@/util/types';
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
            <DynamicPlotMap plots={testPlots} />
          </h1>
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
    latitude: 0.38955848016674315,
    longitude: -79.68464785311586,
    description: 'plot1 description',
  },
  {
    id: '2',
    nodeID: '2',
    latitude: 0.38945848016674315,
    longitude: -79.68464785311586,
    description: 'plot2 description',
  },
  {
    id: '3',
    nodeID: '3',
    latitude: 0.38962848016674315,
    longitude: -79.68464785311586,
    description: 'plot3 description',
  },
  {
    id: '4',
    nodeID: '4',
    latitude: 0.38965848016674315,
    longitude: -79.68464785311586,
    description: 'plot4 description',
  },
];
