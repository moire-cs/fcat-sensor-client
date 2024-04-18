import { DynamicPlotMap } from '@/components/maps/DynamicPlotMap';
import {
  DynamicPlotTable,
  DynamicTableData,
} from '@/components/tables/DynamicPlotTable';
import { Header } from '@/components/ui/header';
import { LastMeasurementsObject, SensorNode, Plot, Sensor } from '@/lib/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<LastMeasurementsObject>({
    nodes: [],
    sensors: [],
    plots: [],
  });
  const [tableData, setTableData] = useState<DynamicTableData>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await axios.get('/api/measurements/latest');
      console.log(fetch.data);
      setMeasurements(fetch.data);
      const lastMeasurements = fetch.data as LastMeasurementsObject;
      const tableData: DynamicTableData = [];
      lastMeasurements.plots.forEach((plot) => {
        const _node = lastMeasurements.nodes.find(
          (_node) => _node.node.id === plot.id,
        );
        const node = _node?.node;
        const sensors = lastMeasurements.sensors;
        const onlyLastMeasurements = _node?.lastMeasurements;
        if (node === undefined || onlyLastMeasurements === undefined) {
          return;
        }
        tableData.push({
          node,
          ...plot,
          sensors,
          lastMeasurements: onlyLastMeasurements,
        });
      });

      setTableData(tableData);
    };
    fetchData();
  }, []);

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
            plots={measurements.plots}
          />
          <DynamicPlotTable
            setSelectedPlot={setSelectedPlot}
            selectedPlot={selectedPlot}
            data={tableData}
          />
        </div>
      </div>
    </>
  );
};
