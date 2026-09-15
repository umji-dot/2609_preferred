import { useState, type ReactNode } from 'react';
import {
  Modal,
  Box,
  Stack,
  Divider,
  Select,
  InputField,
  Button,
  RadioGroup,
  Radio,
  InlineAlert,
} from 'fms-staff-design-system';
import {
  BRANDS_BY_ORIGIN,
  MODELS_BY_BRAND,
  FUEL_OPTIONS,
} from '../mocks';

export interface CarCodeRegisterModalProps {
  open: boolean;
  onClose: () => void;
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

export function CarCodeRegisterModal({
  open,
  onClose,
}: CarCodeRegisterModalProps) {
  const [origin, setOrigin] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [carCode, setCarCode] = useState('');
  const [version, setVersion] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [subModel, setSubModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [length, setLength] = useState('');
  const [discontinuedYear, setDiscontinuedYear] = useState('');

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

  const handleReset = () => {
    setOrigin('');
    setBrand('');
    setModel('');
    setCarCode('');
    setVersion('');
    setModelYear('');
    setSubModel('');
    setFuel('');
    setDisplacement('');
    setLength('');
    setDiscontinuedYear('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="카코드 등록"
      size="lg"
      primaryLabel="등록"
      onPrimary={handleClose}
      secondaryLabel="취소"
      onSecondary={handleClose}
    >
      <Stack direction="column">
        <SectionTitle>차량 식별 정보</SectionTitle>

        <Box marginTop={16}>
          <Stack direction="column">
            <FieldLabel required>국산 / 수입 구분</FieldLabel>
            <Box marginTop={4}>
              <RadioGroup
                name="origin"
                value={origin}
                onChange={handleOrigin}
                orientation="horizontal"
              >
                <Radio value="domestic" label="국산차" />
                <Radio value="import" label="수입차" />
              </RadioGroup>
            </Box>
          </Stack>

          <Box marginTop={16}>
            <Select
              label="제조사"
              required
              fullWidth
              options={brandOptions}
              value={brand}
              onChange={(v) => handleBrand(v as string)}
              placeholder={origin ? '제조사 선택' : '국산/수입 먼저 선택하세요'}
              disabled={!origin}
            />
          </Box>

          <Box marginTop={16}>
            <Select
              label="모델명"
              required
              fullWidth
              options={modelOptions}
              value={model}
              onChange={(v) => setModel(v as string)}
              placeholder={brand ? '모델명 선택' : '제조사를 먼저 선택하세요'}
              disabled={!brand}
            />
          </Box>

          <Box marginTop={16}>
            <FileUploadField
              label="카코드 파일(fbp)"
              optional
              placeholder="fbp 파일을 선택하세요"
              helperText="업로드 시 카코드·버전이 자동입력됩니다"
            />
          </Box>

          <Box marginTop={16}>
            <InputField
              label="카코드"
              required
              fullWidth
              value={carCode}
              onChange={setCarCode}
              placeholder="예: HY-SONATA-2024"
              helperText="고유값. 중복 등록 불가. fbp 업로드 시 자동입력."
            />
          </Box>

          <Box marginTop={16}>
            <InputField
              label="버전"
              fullWidth
              value={version}
              onChange={setVersion}
              placeholder="fbp 업로드 시 자동입력 (직접 입력 가능)"
            />
          </Box>

          <Box marginTop={16}>
            <InputField
              label="연식"
              required
              fullWidth
              type="number"
              value={modelYear}
              onChange={setModelYear}
              placeholder="예: 2024"
              helperText="YYYY 숫자 직접입력"
            />
          </Box>

          <Box marginTop={16}>
            <InputField
              label="하위모델명"
              required
              fullWidth
              value={subModel}
              onChange={setSubModel}
              placeholder="예: 2.0 스마트"
            />
          </Box>

          <Box marginTop={16}>
            <FileUploadField
              label="차량이미지"
              optional
              placeholder="이미지 파일을 선택하세요"
            />
          </Box>
        </Box>

        <Box className="mt-10">
          <SectionTitle>차량 상세 정보</SectionTitle>
        </Box>

        <Box marginTop={16}>
          <Stack direction="column">
            <Select
              label="유종"
              required
              fullWidth
              options={FUEL_OPTIONS}
              value={fuel}
              onChange={(v) => setFuel(v as string)}
              placeholder="선택"
            />
            <Box marginTop={16}>
              <InputField
                label="배기량 (cc)"
                required
                fullWidth
                value={displacement}
                onChange={setDisplacement}
                placeholder="예: 1999 (전기차: 0 입력)"
              />
            </Box>
            <Box marginTop={16}>
              <InputField
                label="전체길이 (mm)"
                required
                fullWidth
                value={length}
                onChange={setLength}
                placeholder="예: 4900"
              />
            </Box>
            <Box marginTop={16}>
              <InputField
                label="단종연도"
                required
                fullWidth
                value={discontinuedYear}
                onChange={setDiscontinuedYear}
                placeholder="예: 2026 (현역 모델: 9999)"
              />
            </Box>
          </Stack>
        </Box>

        <Box marginTop={16}>
          <InlineAlert status="success">
            리버스(O/X)는 서버의 fbp 파일 존재 여부에 따라 자동으로 결정됩니다.
            등록 후 카코드 관리 목록에서 확인하세요.
          </InlineAlert>
        </Box>
      </Stack>
    </Modal>
  );
}
