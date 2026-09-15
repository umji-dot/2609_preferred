import { Table, Icon } from 'fms-staff-design-system';
import type { Column } from 'fms-staff-design-system';
import type { CarCodeRow } from '../mocks';

export interface CarCodeTableProps {
  rows: CarCodeRow[];
  totalCount?: number;
  onExcelDownload?: () => void;
  onCodeClick?: (row: CarCodeRow) => void;
  onVehicleCountClick?: (row: CarCodeRow) => void;
}

export function CarCodeTable({
  rows,
  totalCount,
  onExcelDownload,
  onCodeClick,
  onVehicleCountClick,
}: CarCodeTableProps) {
  const columns: Column<CarCodeRow>[] = [
    {
      id: 'code',
      header: '카코드',
      align: 'left',
      width: 180,
      cell: (row) => (
        <button
          type="button"
          onClick={() => onCodeClick?.(row)}
          className="text-primary text-sm-medium cursor-pointer bg-transparent border-0 p-0 inline-flex items-center gap-1 hover:underline"
        >
          {row.code}
          <span className="text-gray-400 inline-flex items-center justify-center w-4 h-4">
            <Icon name="open_in_new" size={16} decorative />
          </span>
        </button>
      ),
    },
    { id: 'manufacturer', header: '제조사', accessorKey: 'manufacturer', align: 'left', width: 80 },
    { id: 'model', header: '모델명', accessorKey: 'model', align: 'left', width: 120 },
    { id: 'subModel', header: '하위모델명', accessorKey: 'subModel', align: 'left', width: 180 },
    { id: 'modelYear', header: '연식', accessorKey: 'modelYear', align: 'center', width: 72 },
    { id: 'fuel', header: '유종', accessorKey: 'fuel', align: 'center', width: 180 },
    {
      id: 'displacement',
      header: '배기량',
      align: 'center',
      width: 100,
      cell: (row) =>
        row.displacement === '—' ? (
          <span className="text-gray-400">—</span>
        ) : (
          row.displacement
        ),
    },
    { id: 'length', header: '길이(mm)', accessorKey: 'length', align: 'center', width: 100 },
    {
      id: 'reverse',
      header: '리버스',
      align: 'center',
      width: 72,
      cell: (row) => (
        <span
          className={`text-xs-medium ${row.reverse ? 'text-success' : 'text-error'}`}
        >
          {row.reverse ? 'O' : 'X'}
        </span>
      ),
    },
    {
      id: 'version',
      header: '버전',
      align: 'center',
      width: 88,
      cell: (row) =>
        row.version ?? <span className="text-gray-400">—</span>,
    },
    {
      id: 'vehicleCount',
      header: '차량 수',
      align: 'center',
      width: 100,
      cell: (row) => (
        <button
          type="button"
          onClick={() => onVehicleCountClick?.(row)}
          className="text-primary text-sm-medium cursor-pointer bg-transparent border-0 p-0 inline-flex items-center gap-1 hover:underline"
        >
          {row.vehicleCount}대
          <span className="text-gray-400 inline-flex items-center justify-center w-4 h-4">
            <Icon name="open_in_new" size={16} decorative />
          </span>
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={rows}
      rowIdKey="id"
      totalCount={totalCount}
      onExcelDownload={onExcelDownload}
    />
  );
}
