import { useState } from 'react';
import { Box, Stack, Select, Search, Button, Icon } from 'fms-staff-design-system';
import {
  RESELLER_OPTIONS,
  COMPANY_OPTIONS,
  BRANCH_OPTIONS,
  DEVICE_MOUNT_OPTIONS,
  CAR_CODE_YN_OPTIONS,
  REG_DOC_YN_OPTIONS,
  VEHICLE_STATUS_OPTIONS,
} from '../mocks';

export interface VehicleFilterBarProps {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
}

export function VehicleFilterBar({
  onSearchClick,
  onCreateClick,
}: VehicleFilterBarProps) {
  const [reseller, setReseller] = useState('');
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [device, setDevice] = useState('');
  const [carCodeYn, setCarCodeYn] = useState('');
  const [regDocYn, setRegDocYn] = useState('');
  const [status, setStatus] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <Box paddingX={24} paddingY={16}>
      {/* 필터바는 wrap 하지 않고 한 줄 유지. 뷰포트가 좁아지면 조회↔등록 사이 spacer 가 8px 까지
          자연 축소되고, 그 이하로 좁아지면 outer(overflow-x-auto)에서 가로 스크롤 처리. */}
      <Stack direction="row" align="end">
        <Box width={128} className="shrink-0">
          <Select label="리셀러" fullWidth options={RESELLER_OPTIONS} value={reseller} onChange={(v) => setReseller(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={120} className="shrink-0">
          <Select label="업체" fullWidth options={COMPANY_OPTIONS} value={company} onChange={(v) => setCompany(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={120} className="shrink-0">
          <Select label="지점" fullWidth options={BRANCH_OPTIONS} value={branch} onChange={(v) => setBranch(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={152} className="shrink-0">
          <Select label="단말기 장착여부" fullWidth options={DEVICE_MOUNT_OPTIONS} value={device} onChange={(v) => setDevice(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={128} className="shrink-0">
          <Select label="카코드" fullWidth options={CAR_CODE_YN_OPTIONS} value={carCodeYn} onChange={(v) => setCarCodeYn(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={128} className="shrink-0">
          <Select label="등록증" fullWidth options={REG_DOC_YN_OPTIONS} value={regDocYn} onChange={(v) => setRegDocYn(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} width={140} className="shrink-0">
          <Select label="차량상태" fullWidth options={VEHICLE_STATUS_OPTIONS} value={status} onChange={(v) => setStatus(v as string)} placeholder="전체" />
        </Box>
        <Box marginLeft={8} className="shrink-0">
          <Search
            label="차량번호 / 단말기번호 / 카코드 검색"
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
        {/* 조회 ↔ 차량 등록 사이 반응형 여백. 최소 8px 유지, 뷰포트가 넓어질수록 확장.
            필터바 자체가 min-w-[1660px] 이므로 뷰포트 1660 미만이 되면 필터영역은 더 이상
            축소되지 않고 페이지 가로 스크롤로 넘어간다. */}
        <Box grow minWidth={8} />
        <Box className="shrink-0">
          <Button
            variant="secondary"
            size="md"
            leadingIcon={<Icon name="add" size={16} decorative />}
            onClick={onCreateClick}
          >
            차량 등록
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
