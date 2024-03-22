import { DataTable } from '@/components/ui/data-table';
import { Plot } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { SensorNode } from './columns/sensorNode';

export const columns: ColumnDef<Plot>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Node',
    cell: ({ cell }) => <SensorNode />,
    accessorKey: 'nodeID',
  },
  {
    header: 'location',
    accessorKey: 'location',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Alerts',
    accessorKey: 'alerts',
  },
];

export const DynamicPlotTable = ({ plots }: { plots: Array<Plot> }) => (
  <div>
    <DataTable columns={columns} data={plots} />
  </div>
);
