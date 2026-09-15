import { useState } from 'react';
import { Box, Stack, Select, Search, Button, Icon } from 'fms-staff-design-system';
/* Default 테이블(툴바)에서 엑셀 다운로드를 담당하므로 필터바에는 카코드 등록 버튼만 유지. */
import {
  MANUFACTURER_OPTIONS,
  MODEL_OPTIONS,
  MODEL_YEAR_OPTIONS,
} from '../mocks';

export interface CarCodeFilterBarProps {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
}

export function CarCodeFilterBar({
  onSearchClick,
  onCreateClick,
}: CarCodeFilterBarProps) {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <Box paddingX={24} paddingY={16}>
      <Stack direction="row" align="end" wrap>
        <Box width={128}>
          <Select
            label="제조사"
            fullWidth
            options={MANUFACTURER_OPTIONS}
            value={manufacturer}
            onChange={(v) => setManufacturer(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={128}>
          <Select
            label="모델명"
            fullWidth
            options={MODEL_OPTIONS}
            value={model}
            onChange={(v) => setModel(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={120}>
          <Select
            label="연식"
            fullWidth
            options={MODEL_YEAR_OPTIONS}
            value={modelYear}
            onChange={(v) => setModelYear(v as string)}
            placeholder="전체"
          />
        </Box>
        <Box marginLeft={8} width={240}>
          <Search
            label="카코드 검색"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={setKeyword}
          />
        </Box>
        <Box marginLeft={8}>
          <Button variant="primary" size="md" onClick={onSearchClick}>
            조회
          </Button>
        </Box>
        <Box grow />
        <Box>
          <Button
            variant="secondary"
            size="md"
            leadingIcon={<Icon name="add" size={16} decorative />}
            onClick={onCreateClick}
          >
            카코드 등록
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
