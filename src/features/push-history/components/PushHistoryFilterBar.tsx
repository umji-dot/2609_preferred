import { useState } from 'react';
import {
  Box,
  Stack,
  Select,
  Search,
  DateField,
  Button,
} from 'fms-staff-design-system';
import {
  PUSH_TYPE_OPTIONS,
  COMPANY_OPTIONS,
  BRANCH_OPTIONS,
} from '../mocks';

export interface PushHistoryFilterBarProps {
  onSearchClick?: () => void;
}

export function PushHistoryFilterBar({ onSearchClick }: PushHistoryFilterBarProps) {
  const [type, setType] = useState('');
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [startDate, setStartDate] = useState('2026-09-08');
  const [endDate, setEndDate] = useState('2026-09-09');
  const [keyword, setKeyword] = useState('');

  return (
    <Box paddingX={24} paddingY={16}>
      <Stack direction="row" align="end">
        <Box width={180} className="shrink-0">
          <Select
            label="푸시 발송 타입"
            fullWidth
            options={PUSH_TYPE_OPTIONS}
            value={type}
            onChange={(v) => setType(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={160} className="shrink-0">
          <Select
            label="업체"
            fullWidth
            options={COMPANY_OPTIONS}
            value={company}
            onChange={(v) => setCompany(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={128} className="shrink-0">
          <Select
            label="지점"
            fullWidth
            options={BRANCH_OPTIONS}
            value={branch}
            onChange={(v) => setBranch(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={200} className="shrink-0">
          <DateField
            label="푸시 발송 일자 시작일"
            fullWidth
            value={startDate}
            onChange={setStartDate}
          />
        </Box>
        <Box marginLeft={8} width={200} className="shrink-0">
          <DateField
            label="푸시 발송 일자 종료일"
            fullWidth
            value={endDate}
            onChange={setEndDate}
          />
        </Box>
        <Box marginLeft={8} className="shrink-0">
          <Search
            label="푸시 제목 / 내용 / 차량 번호 / 업체명 / 지점명 검색"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={setKeyword}
          />
        </Box>
        <Box marginLeft={8} className="shrink-0">
          <Button variant="primary" size="md" onClick={onSearchClick}>
            조회
          </Button>
        </Box>
        <Box grow minWidth={8} />
      </Stack>
    </Box>
  );
}
