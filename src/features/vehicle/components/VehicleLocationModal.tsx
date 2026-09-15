import { useState } from 'react';
import {
  Modal,
  Box,
  Stack,
  InputField,
  Button,
  Icon,
} from 'fms-staff-design-system';
import type { VehicleRow } from '../mocks';

export interface VehicleLocationModalProps {
  open: boolean;
  onClose: () => void;
  row: VehicleRow | null;
}

/**
 * 차량위치 수정 팝업 — PRD §4.2.5 "현행 유지" 명시.
 * 목업이 별도로 없어 기존 관례(현재 위치 · 변경 위치 · 지도)를 골격으로 재현한다.
 * 실제 지도 UI(카카오맵)는 이 프로젝트 범위 밖이라 회색 placeholder 로 대체.
 */
export function VehicleLocationModal({
  open,
  onClose,
  row,
}: VehicleLocationModalProps) {
  const [newAddress, setNewAddress] = useState('');

  if (!row) return null;

  const currentAddress = '서울특별시 강남구 테헤란로 152 (역삼동)';

  const handleClose = () => {
    setNewAddress('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`차량위치 수정 — ${row.plateNo}`}
      size="md"
      primaryLabel="저장"
      onPrimary={handleClose}
      secondaryLabel="취소"
      onSecondary={handleClose}
    >
      <Stack direction="column">
        <InputField
          label="현재 위치"
          fullWidth
          disabled
          value={currentAddress}
        />

        <Box marginTop={16}>
          <InputField
            label="변경 위치"
            required
            fullWidth
            value={newAddress}
            onChange={setNewAddress}
            placeholder="주소를 검색해 주세요"
          />
          <Box marginTop={4} className="text-xs-regular text-gray-400">
            지도에서 위치를 지정하거나 주소를 직접 입력할 수 있습니다.
          </Box>
        </Box>

        {/* 지도 placeholder */}
        <Box marginTop={16}>
          <Box
            paddingY={64}
            paddingX={24}
            className="bg-gray-50 rounded-md border border-gray-200 text-center"
          >
            <Stack direction="column" align="center">
              <Icon name="map" size={48} filled decorative />
              <Box marginTop={12} className="text-sm-regular text-gray-500">
                지도 (카카오맵)
              </Box>
              <Box marginTop={4} className="text-xs-regular text-gray-400">
                실제 서비스에서는 카카오맵이 표시되며 지도 클릭으로
                <br />
                위치를 지정할 수 있습니다.
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box marginTop={8}>
          <Stack direction="row" align="center">
            <Box grow>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                leadingIcon={<Icon name="my_location" size={16} decorative />}
              >
                현재 위치로 이동
              </Button>
            </Box>
            <Box marginLeft={8} grow>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                leadingIcon={<Icon name="search" size={16} decorative />}
              >
                주소 검색
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Modal>
  );
}
