import { useEffect, useState, type ReactNode } from 'react';
import {
  Modal,
  Box,
  Stack,
  Grid,
  Divider,
  Select,
  InputField,
  Button,
  RadioGroup,
  Radio,
} from 'fms-staff-design-system';
import type { CarCodeRow } from '../mocks';
import {
  BRANDS_BY_ORIGIN,
  MODELS_BY_BRAND,
  FUEL_OPTIONS,
} from '../mocks';

export interface CarCodeEditModalProps {
  open: boolean;
  onClose: () => void;
  row: CarCodeRow | null;
}

const DOMESTIC_BRANDS = new Set(BRANDS_BY_ORIGIN.domestic.map((o) => o.value));

function inferOrigin(brand: string): string {
  return DOMESTIC_BRANDS.has(brand) ? 'domestic' : 'import';
}

/** 폼 라벨 — 필수(*)/선택 뱃지 지원. */
function FieldLabel({
  children,
  required,
  optional,
}: {
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <Box as="label" className="text-sm-regular">
      <Stack direction="row" align="center">
        <span>{children}</span>
        {required && <span className="text-error ml-0.5">*</span>}
        {optional && (
          <span className="text-xs-regular text-gray-400 ml-1">선택</span>
        )}
      </Stack>
    </Box>
  );
}

/** 파일 업로드 임시 표현 — DS 에 파일 업로드 컴포넌트가 없어 InputField(readOnly) + [파일 선택] 버튼으로 흉내. */
function FileUploadField({
  label,
  helperText,
  placeholder,
  optional,
}: {
  label: string;
  helperText?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  const [fileName, setFileName] = useState('');
  return (
    <Stack direction="column">
      <FieldLabel optional={optional}>{label}</FieldLabel>
      <Box marginTop={4}>
        <Stack direction="row" align="center">
          <Box grow>
            <InputField
              fullWidth
              readOnly
              value={fileName}
              placeholder={placeholder ?? '파일을 선택하세요'}
            />
          </Box>
          <Box marginLeft={8}>
            <Button
              variant="secondary"
              size="md"
              onClick={() =>
                setFileName((prev) =>
                  prev ? '' : '예시_파일명.fbp',
                )
              }
            >
              파일 선택
            </Button>
          </Box>
        </Stack>
      </Box>
      {helperText && (
        <Box marginTop={4} className="text-xs-regular text-gray-400">
          {helperText}
        </Box>
      )}
    </Stack>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Stack direction="column">
      <Box className="text-base-semibold text-gray-950">{children}</Box>
      <Box marginTop={8}>
        <Divider />
      </Box>
    </Stack>
  );
}

export function CarCodeEditModal({
  open,
  onClose,
  row,
}: CarCodeEditModalProps) {
  const [origin, setOrigin] = useState('domestic');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [subModel, setSubModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [length, setLength] = useState('');
  const [discontinuedYear, setDiscontinuedYear] = useState('');

  // 선택한 row 로 폼 초기값 pre-fill
  useEffect(() => {
    if (!row) return;
    setOrigin(inferOrigin(row.manufacturer));
    setBrand(row.manufacturer);
    setModel(row.model);
    setVersion(row.version ?? '');
    setModelYear(String(row.modelYear));
    setSubModel(row.subModel);
    setFuel(row.fuel);
    setDisplacement(row.displacement === '—' ? '0' : row.displacement);
    setLength(row.length.replace(/,/g, ''));
    setDiscontinuedYear('9999');
  }, [row]);

  const brandOptions = origin ? BRANDS_BY_ORIGIN[origin] ?? [] : [];
  const modelOptions = brand ? MODELS_BY_BRAND[brand] ?? [] : [];

  const handleOrigin = (v: string) => {
    setOrigin(v);
    setBrand('');
    setModel('');
  };
  const handleBrand = (v: string) => {
    setBrand(v);
    setModel('');
  };

  const title = row ? `카코드 수정 — ${row.model}` : '카코드 수정';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="lg"
      primaryLabel="수정"
      onPrimary={onClose}
      secondaryLabel="취소"
      onSecondary={onClose}
    >
      <Stack direction="column">
        {/* fbp 파일 정보 — 각 필드 disabled 로 읽기 전용 표시. 별도 배경 카드 없이 일반 폼 흐름으로. */}
        <SectionTitle>fbp 파일 정보</SectionTitle>
        <Box marginTop={12}>
          <Grid columns={2} gap={16}>
            <InputField
              label="fbp 파일명"
              fullWidth
              disabled
              value={row ? `${row.code}.fbp` : ''}
            />
            <InputField
              label="fbp 버전"
              fullWidth
              disabled
              value={row?.version ?? ''}
            />
            <InputField
              label="업데이트 일자"
              fullWidth
              disabled
              value={row ? '2024-11-15' : ''}
            />
            <InputField
              label="리버스 (자동 감지)"
              fullWidth
              disabled
              value={
                row
                  ? row.reverse
                    ? 'O (fbp 파일 있음)'
                    : 'X (fbp 파일 없음)'
                  : ''
              }
            />
          </Grid>
        </Box>

        <Box marginTop={16} className="text-sm-regular text-gray-950">
          제조사·모델명은 imsform 차량 카테고리 DB 기반으로 선택합니다.
        </Box>

        <Box className="mt-10">
          <SectionTitle>차량 식별 정보</SectionTitle>
        </Box>

        <Box marginTop={16}>
          <Grid columns={2} gap={16}>
            <Box className="col-span-2">
              <Stack direction="column">
                <FieldLabel required>국산 / 수입 구분</FieldLabel>
                <Box marginTop={4}>
                  <RadioGroup
                    name="edit-origin"
                    value={origin}
                    onChange={handleOrigin}
                    orientation="horizontal"
                  >
                    <Radio value="domestic" label="국산차" />
                    <Radio value="import" label="수입차" />
                  </RadioGroup>
                </Box>
              </Stack>
            </Box>

            <Select
              label="제조사"
              required
              fullWidth
              options={brandOptions}
              value={brand}
              onChange={(v) => handleBrand(v as string)}
              placeholder="선택"
            />
            <Select
              label="모델명"
              required
              fullWidth
              options={modelOptions}
              value={model}
              onChange={(v) => setModel(v as string)}
              placeholder="선택"
              disabled={!brand}
            />

            <Box className="col-span-2">
              <FileUploadField
                label="카코드 파일(fbp)"
                optional
                placeholder="fbp 파일을 선택하세요"
                helperText="재업로드 시 카코드·버전이 자동업데이트됩니다"
              />
            </Box>

            <InputField
              label="카코드"
              required
              fullWidth
              disabled
              value={row?.code ?? ''}
              helperText="기등록된 카코드는 카코드명 변경 불가"
            />
            <InputField
              label="버전"
              fullWidth
              value={version}
              onChange={setVersion}
              placeholder="fbp 업로드 시 자동입력 (직접 입력 가능)"
            />

            <InputField
              label="연식"
              required
              fullWidth
              type="number"
              value={modelYear}
              onChange={setModelYear}
              helperText="YYYY 숫자 직접입력"
            />
            <Box />

            <Box className="col-span-2">
              <InputField
                label="하위모델명"
                required
                fullWidth
                value={subModel}
                onChange={setSubModel}
                placeholder="예: 2.0 스마트"
              />
            </Box>
          </Grid>
        </Box>

        <Box className="mt-10">
          <SectionTitle>차량 상세 정보</SectionTitle>
        </Box>

        <Box marginTop={16}>
          <Grid columns={2} gap={16}>
            <Select
              label="유종"
              required
              fullWidth
              options={FUEL_OPTIONS}
              value={fuel}
              onChange={(v) => setFuel(v as string)}
              placeholder="선택"
            />
            <InputField
              label="배기량 (cc)"
              required
              fullWidth
              value={displacement}
              onChange={setDisplacement}
              placeholder="예: 1999 (전기차: 0 입력)"
            />
            <InputField
              label="전체길이 (mm)"
              required
              fullWidth
              value={length}
              onChange={setLength}
              placeholder="예: 4900"
            />
            <InputField
              label="단종연도"
              required
              fullWidth
              value={discontinuedYear}
              onChange={setDiscontinuedYear}
              placeholder="예: 2026 (현역 모델: 9999)"
            />
          </Grid>
          <Box marginTop={12} className="text-sm-regular text-gray-950">
            리버스(O/X)는 fbp 파일 존재 여부에 따라 자동 결정됩니다.
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
}
