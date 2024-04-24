import { DataTable } from '@/components/ui/data-table';
import { Measurement, Plot, Sensor, SensorNode } from '@/lib/types';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { LucideBatteryWarning } from 'lucide-react';
import { SensorNodeCell } from './cell/sensorNodeCell';
import { Progress } from '../ui/progress';
import { lastMeasurementsCell } from './cell/lastMeasurementsCell';
import { useEffect, useState } from 'react';
import { LastSeenCell } from './cell/lastSeenCell';
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
>[] = ({ setSelectedPlot, selectedPlot }) => [
  {
    header: 'Plot ID',
    accessorKey: 'id',
  },
  {
    header: 'Node',
    cell: (cell) => <SensorNodeCell plotId={cell.getValue() as string} />,
    accessorKey: 'nodeID',
  },
  {
    header: 'Last Seen',
    cell: (cell) => (
      <LastSeenCell
        lastSeen={new Date(cell.row.original.lastMeasurements[0].createdAt)}
      />
    ),
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
          onClick={() => {
            setSelectedPlot(id);
            window.scrollTo(0, 0);
          }}
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
    cell: (cell) =>
      lastMeasurementsCell(
        cell.row.original.lastMeasurements,
        cell.row.original.sensors,
      ),
  },
];

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
      highlightRow={(row) => row.id === selectedPlot}
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
