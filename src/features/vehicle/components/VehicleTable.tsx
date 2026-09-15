import { useState } from 'react';
import { Table, Badge, Box, Icon } from 'fms-staff-design-system';
import type { Column } from 'fms-staff-design-system';
import type { VehicleRow, VerificationStatus, VehicleStatus } from '../mocks';

export interface VehicleTableProps {
  rows: VehicleRow[];
  totalCount?: number;
  onExcelDownload?: () => void;
  onVinClick?: (row: VehicleRow) => void;
}

/** 하이브리드(휘발유+전기) 처럼 괄호 세부 표기는 셀 폭 절약을 위해 "하이브리드" 로 축약. */
function shortFuel(fuel: string): string {
  return fuel.startsWith('하이브리드') ? '하이브리드' : fuel;
}

function VerificationMark({ value }: { value: VerificationStatus }) {
  if (value === 'VERIFIED')
    return <span className="text-xs-medium text-success">O</span>;
  if (value === 'UNVERIFIED')
    return <span className="text-xs-medium text-error">X</span>;
  return <span className="text-gray-400">—</span>;
}

function StatusBadge({ value }: { value: VehicleStatus }) {
  return value === '운영' ? (
    <Badge status="success">운영</Badge>
  ) : (
    <Badge status="neutral">매각</Badge>
  );
}

function VehicleImagePlaceholder({ emoji }: { emoji: string }) {
  return (
    <Box
      width={40}
      height={40}
      className="bg-gray-200 rounded mx-auto flex items-center justify-center text-base-regular"
    >
      {emoji}
    </Box>
  );
}

export function VehicleTable({
  rows,
  totalCount,
  onExcelDownload,
  onVinClick,
}: VehicleTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns: Column<VehicleRow>[] = [
    { id: 'id', header: 'ID', accessorKey: 'id', align: 'center' },
    {
      id: 'image',
      header: '차량이미지',
      align: 'center',
      cell: (row) => <VehicleImagePlaceholder emoji={row.imageEmoji} />,
    },
    {
      id: 'reseller',
      header: '리셀러',
      align: 'center',
      cell: (row) => row.reseller.replace(/^리셀러/, ''),
    },
    { id: 'company', header: '업체명', accessorKey: 'company', align: 'left' },
    {
      id: 'branch',
      header: '지점명',
      align: 'center',
      cell: (row) => row.branch.replace(/지점$/, ''),
    },
    {
      id: 'vin',
      header: '차대번호',
      align: 'left',
      width: 220,
      cell: (row) => (
        <button
          type="button"
          onClick={() => onVinClick?.(row)}
          className="text-primary text-sm-medium cursor-pointer bg-transparent border-0 p-0 inline-flex items-center gap-1 hover:underline"
        >
          {row.vin}
          <span className="text-gray-400 inline-flex items-center justify-center w-4 h-4">
            <Icon name="open_in_new" size={16} decorative />
          </span>
        </button>
      ),
    },
    { id: 'plateNo', header: '차량번호', accessorKey: 'plateNo', align: 'left' },
    { id: 'modelYear', header: '연식', accessorKey: 'modelYear', align: 'center' },
    { id: 'manufacturer', header: '제조사', accessorKey: 'manufacturer', align: 'left' },
    { id: 'model', header: '모델명', accessorKey: 'model', align: 'left' },
    { id: 'subModel', header: '하위모델명', accessorKey: 'subModel', align: 'left' },
    { id: 'deviceType', header: '단말기 기종', accessorKey: 'deviceType', align: 'left' },
    { id: 'deviceSN', header: '단말기 SN', accessorKey: 'deviceSN', align: 'left' },
    {
      id: 'fuel',
      header: '연료종류',
      align: 'center',
      cell: (row) => shortFuel(row.fuel),
    },
    { id: 'mileage', header: '주행거리', accessorKey: 'mileage', align: 'center' },
    { id: 'commMode', header: '통신모드', accessorKey: 'commMode', align: 'center' },
    { id: 'firstInstall', header: '최초 설치일', accessorKey: 'firstInstall', align: 'center' },
    { id: 'lastInstall', header: '최근 설치일', accessorKey: 'lastInstall', align: 'center' },
    {
      id: 'removedAt',
      header: '탈거일',
      align: 'center',
      cell: (row) =>
        row.removedAt ?? <span className="text-gray-400">—</span>,
    },
    {
      id: 'carCode',
      header: '카코드',
      align: 'left',
      cell: (row) => row.carCode ?? <span className="text-gray-400">—</span>,
    },
    {
      id: 'registration',
      header: '차량등록증',
      align: 'center',
      width: 80,
      cell: (row) => <VerificationMark value={row.registration} />,
    },
    {
      id: 'status',
      header: '차량상태',
      align: 'center',
      cell: (row) => <StatusBadge value={row.status} />,
    },
  ];

  return (
    <Table
      columns={columns}
      data={rows}
      rowIdKey="id"
      selectable
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      totalCount={totalCount}
      onExcelDownload={onExcelDownload}
    />
  );
}
