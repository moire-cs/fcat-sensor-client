import { DataTable } from '@/components/ui/data-table';
import { Measurement, Plot, Sensor, SensorNode } from '@/lib/types';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { LucideBatteryWarning } from 'lucide-react';
import { SensorNodeColumn } from './columns/sensorNodeColumn';
import { Progress } from '../ui/progress';
export const columnFactory: ({
  setSelectedPlot,
  selectedPlot,
}: {
  selectedPlot: string | null;
  setSelectedPlot: (val: string | null) => void;
}) => ColumnDef<
  Plot & {
    node: SensorNode;
    sensors: Array<Sensor>;
    lastMeasurements: Array<Measurement>;
  }
>[] = ({ setSelectedPlot, selectedPlot }) => {
  const a = 0;
  return [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Node',
      cell: (cell) => <SensorNodeColumn plotId={cell.getValue() as string} />,
      accessorKey: 'nodeID',
    },
    {
      header: 'location',
      accessorKey: 'location',
      cell: (cell) => {
        const location = {
          latitude: cell.row.original.latitude,
          longitude: cell.row.original.longitude,
        };
        const id = cell.row.original.id as string;
        return (
          <div
            onClick={() => setSelectedPlot(id)}
            className="border w-fit bg-gradient-to-r rounded-3xl p-2 to-blue-200 from-blue-50 hover:to-blue-100"
          >
            <div>{`${Math.abs(location.latitude).toFixed(5)}°${location.latitude > 0 ? 'N' : 'S'}`}</div>
            <div>{`${Math.abs(location.longitude).toFixed(5)}°${location.longitude > 0 ? 'E' : 'W'}`}</div>
          </div>
        );
      },
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Last Measurements',
      cell: (cell) => {
        const lastMeasurements = cell.row.original.lastMeasurements;
        const sensors = cell.row.original.sensors;
        return (
          <div className="flex flex-row">
            {lastMeasurements.map((measurement) => {
              const sensor = sensors.find(
                (sensor) => sensor.id.toString() === measurement.sensorID,
              );
              const valuePercentage = sensor
                ? ((parseFloat(measurement.data) - sensor.typicalRange[0]) /
                    (sensor.typicalRange[1] - sensor.typicalRange[0])) *
                  100
                : 0;
              console.log(valuePercentage);

              return (
                <div className="flex flex-col p-2 border rounded-lg m-2 bg-gradient-to-r from-green-200 to-green-100 hover:to-green-200">
                  <div className="flex flex-col">
                    <div className="font-bold">{sensor?.name}</div>
                    <div className="flex flex-row">
                      <div className="font-bold">{measurement.data}</div>
                      <div>{sensor?.description}</div>
                    </div>
                  </div>
                  <Progress value={valuePercentage} />
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];
};

export const DynamicPlotTable = ({
  data,
  selectedPlot,
  setSelectedPlot,
}: {
  data: DynamicTableData;
  selectedPlot: string | null;
  setSelectedPlot: (val: string | null) => void;
}) => (
  <div>
    <DataTable
      columns={columnFactory({ setSelectedPlot, selectedPlot })}
      data={data}
    />
  </div>
);

export type DynamicTableData = Array<
  Plot & {
    node: SensorNode;
    sensors: Array<Sensor>;
    lastMeasurements: Array<Measurement>;
  }
>;
