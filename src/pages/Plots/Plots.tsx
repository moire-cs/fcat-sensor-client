// import for Leaflet map
import { MemoizedDynamicPlotMapLeaflet } from '@/components/maps/DynamicPlotMapLeaflet';
// import for google maps
import { MemoizedDynamicPlotMapGoogle } from '@/components/maps/DynamicPlotMapGoogle';
import {
  DynamicPlotTable,
  DynamicTableData,
} from '@/components/tables/DynamicPlotTable';
import { Header } from '@/components/ui/header';
import { LastMeasurementsObject, SensorNode, Plot, Sensor } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '@/LocalizationProvider';
import { decodeCombined } from '@/lib/utils';

export const Plots = () => {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<LastMeasurementsObject>({
    nodes: [],
    sensors: [],
    plots: [],
  });
  const [tableData, setTableData] = useState<DynamicTableData>([]);
  const memoizedPlots = useMemo(() => measurements.plots, [measurements]);
  const { language } = useLanguage();

  const fetchData = async () => {
    const fetch = await axios.get('/api/measurements/latest');
    setMeasurements(fetch.data);
    const lastMeasurements = fetch.data as LastMeasurementsObject;
    const fetchedTableData: DynamicTableData = [];
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
      fetchedTableData.push({
        node,
        ...plot,
        sensors,
        lastMeasurements: onlyLastMeasurements,
      });
    });

    setTableData(fetchedTableData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    //pop selected plot from the table, put at the top
    if (selectedPlot === null) {
      return;
    }
    const newTableData = tableData.filter((plot) => plot.id !== selectedPlot);
    setTableData([
      tableData.find((plot) => plot.id === selectedPlot)!,
      ...newTableData,
    ]);
  }, [selectedPlot, tableData]);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        fetchData();
        resolve(null);
      }, 10000);
    });
  }, [measurements]);

  return (
    <>
      <Header />
      <div className="flex justify-center ">
        <div className=" w-5/6 bg-white drop-shadow-lg  p-10 pt-0 mt-0 m-10">
          <h1 className="font-bold  tracking-tighter text-4xl pt-8">
            {decodeCombined('[en]Plots[es]Parcelas', language)}
          </h1>
          {memoizedPlots.length > 0 && (
            <MemoizedDynamicPlotMapLeaflet
              setSelectedPlot={setSelectedPlot}
              selectedPlot={selectedPlot}
              plots={memoizedPlots}
            />
          )}
          <DynamicPlotTable
            setSelectedPlot={setSelectedPlot}
            selectedPlot={selectedPlot}
            data={tableData}
            language={language}
          />
        </div>
      </div>
    </>
  );
};
