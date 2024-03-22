import { DataTable } from '@/components/ui/data-table';
import { Plot } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { SensorNode } from './columns/sensorNode';
import { LucideBatteryWarning } from 'lucide-react';
export const columnFactory: ({
  setSelectedPlot,
  selectedPlot,
}: {
  selectedPlot: string | null;
  setSelectedPlot: (val: string | null) => void;
}) => ColumnDef<Plot>[] = ({ setSelectedPlot, selectedPlot }) => {
  const a = 0;
  return [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Node',
      cell: (cell) => <SensorNode plotId={cell.getValue() as string} />,
      accessorKey: 'nodeID',
    },
    {
      header: 'location',
      accessorKey: 'location',
      cell: (cell) => {
        const location = cell.getValue() as {
          latitude: number;
          longitude: number;
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
      header: 'Alerts',
      accessorKey: 'alerts',
      cell: (cell) => {
        const alerts = cell.getValue() as Array<string>;
        if (alerts === undefined) {
          return <></>;
        }
        return (
          <div>
            {alerts.map((alert, index) => (
              <div className="flex flex-row">
                <LucideBatteryWarning className="m-1 mt-.5" />
                <div className="m-1" key={index}>
                  {alert}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  ];
};

export const DynamicPlotTable = ({
  plots,
  selectedPlot,
  setSelectedPlot,
}: {
  plots: Array<Plot>;
  selectedPlot: string | null;
  setSelectedPlot: (val: string | null) => void;
}) => (
  <div>
    <DataTable
      columns={columnFactory({ setSelectedPlot, selectedPlot })}
      data={plots}
    />
  </div>
);
