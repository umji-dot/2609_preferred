import { Table } from 'fms-staff-design-system';
import type { Column } from 'fms-staff-design-system';
import type { PushHistoryRow } from '../mocks';

export interface PushHistoryTableProps {
  rows: PushHistoryRow[];
  totalCount?: number;
}

export function PushHistoryTable({ rows, totalCount }: PushHistoryTableProps) {
  const columns: Column<PushHistoryRow>[] = [
    { id: 'type', header: '푸시 발송 타입', accessorKey: 'type', align: 'center', width: 128 },
    { id: 'company', header: '업체명', accessorKey: 'company', align: 'left', width: 160 },
    { id: 'branch', header: '지점명', accessorKey: 'branch', align: 'left', width: 112 },
    { id: 'plateNumber', header: '차량번호', accessorKey: 'plateNumber', align: 'center', width: 112 },
    { id: 'model', header: '차량모델', accessorKey: 'model', align: 'left', width: 112 },
    { id: 'title', header: '푸시 제목', accessorKey: 'title', align: 'left', width: 144 },
    { id: 'content', header: '푸시 내용', accessorKey: 'content', align: 'left' },
    { id: 'sendCount', header: '발송 건수', accessorKey: 'sendCount', align: 'center', width: 88 },
    { id: 'sentAt', header: '푸시 발송일자', accessorKey: 'sentAt', align: 'center', width: 160 },
  ];

  return <Table columns={columns} data={rows} rowIdKey="id" totalCount={totalCount} />;
}
