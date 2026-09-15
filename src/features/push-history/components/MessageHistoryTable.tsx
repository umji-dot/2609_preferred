import { Table, Badge } from 'fms-staff-design-system';
import type { Column } from 'fms-staff-design-system';
import type { MessageHistoryRow } from '../mocks';

export interface MessageHistoryTableProps {
  rows: MessageHistoryRow[];
  totalCount?: number;
  onExcelDownload?: () => void;
}

export function MessageHistoryTable({
  rows,
  totalCount,
  onExcelDownload,
}: MessageHistoryTableProps) {
  const columns: Column<MessageHistoryRow>[] = [
    { id: 'company', header: '업체명', accessorKey: 'company', align: 'left', width: 160 },
    { id: 'branch', header: '지점명', accessorKey: 'branch', align: 'left', width: 112 },
    { id: 'plateNumber', header: '차량번호', accessorKey: 'plateNumber', align: 'center', width: 112 },
    { id: 'model', header: '차량모델', accessorKey: 'model', align: 'left', width: 96 },
    { id: 'content', header: '발송 내용', accessorKey: 'content', align: 'left' },
    { id: 'channel', header: '채널', accessorKey: 'channel', align: 'center', width: 112 },
    {
      id: 'result',
      header: '발송 결과',
      align: 'center',
      width: 96,
      cell: (row) =>
        row.result === '성공' ? (
          <Badge status="success" size="sm">성공</Badge>
        ) : (
          <Badge status="error" size="sm">실패</Badge>
        ),
    },
    {
      id: 'failReason',
      header: '실패 사유',
      align: 'left',
      width: 200,
      cell: (row) =>
        row.failReason ? (
          <span className="text-error">{row.failReason}</span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    { id: 'sentAt', header: '발송일시', accessorKey: 'sentAt', align: 'center', width: 160 },
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
