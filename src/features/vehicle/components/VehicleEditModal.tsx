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
  Badge,
  Icon,
  InlineAlert,
} from 'fms-staff-design-system';
import type { VehicleRow } from '../mocks';
import {
  COMPANY_OPTIONS,
  BRANCH_OPTIONS,
} from '../mocks';
import { DocPreviewCard } from './DocPreviewCard';

export interface VehicleEditModalProps {
  open: boolean;
  onClose: () => void;
  row: VehicleRow | null;
  onOpenLocation?: (row: VehicleRow) => void;
}

/* ────────── 공통 파츠 ────────── */

function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <Stack direction="row" align="center">
      <Box
        width={22}
        height={22}
        className="bg-primary text-white rounded-full inline-flex items-center justify-center text-xs-medium"
      >
        {step}
      </Box>
      <Box marginLeft={8} className="text-base-semibold text-gray-950">
        {title}
      </Box>
    </Stack>
  );
}

function SectionTitle({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: string;
}) {
  return (
    <Stack direction="column">
      <Stack direction="row" align="center">
        {icon && <Icon name={icon} size={16} filled decorative />}
        <Box
          marginLeft={icon ? 4 : 0}
          className="text-base-semibold text-gray-950"
        >
          {children}
        </Box>
      </Stack>
      <Box marginTop={8}>
        <Divider />
      </Box>
    </Stack>
  );
}

/* ────────── 좌측 · 등록증 관리 ──────────
   등록증 카드 UI 는 공용 컴포넌트(DocPreviewCard) 재사용.
   §7.12 "등록증 카드 UI 규격" 규칙 준수. */

function LeftPanel({
  row,
  verified,
  onToggleVerified,
  onOpenLocation,
}: {
  row: VehicleRow;
  verified: boolean;
  onToggleVerified: () => void;
  onOpenLocation?: (row: VehicleRow) => void;
}) {
  const [reuploadOpen, setReuploadOpen] = useState(false);

  return (
    <Stack direction="column">
      <StepHeader step={1} title="등록증 관리" />

      {/* 인증 상태 */}
      <Box
        marginTop={16}
        paddingX={12}
        paddingY={8}
        className="bg-gray-50 rounded-md"
      >
        <Stack direction="row" align="center">
          {verified ? (
            <Badge status="success" showDot>
              검증
            </Badge>
          ) : (
            <Badge status="neutral" showDot>
              미검증
            </Badge>
          )}
          <Box marginLeft={8} grow className="text-sm-regular text-gray-950">
            {verified
              ? 'OCR + 소유주 검증 완료'
              : '차량등록증 미확인 상태'}
          </Box>
          <Button
            variant="secondary"
            size="sm"
            onClick={onToggleVerified}
            aria-label="인증 상태 전환"
            leadingIcon={<Icon name="swap_horiz" size={16} decorative />}
          >
            전환
          </Button>
        </Stack>
      </Box>

      {/* VERIFIED / UNVERIFIED 패널 */}
      <Box marginTop={12}>
        {verified ? (
          <Stack direction="column">
            <DocPreviewCard
              variant="view"
              title="차량등록증 보기"
              caption="발급일: 2024-03-15"
            />
            <Box marginTop={8}>
              <Stack direction="row" align="center">
                <Box grow>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    leadingIcon={<Icon name="visibility" size={16} decorative />}
                  >
                    보기
                  </Button>
                </Box>
                <Box marginLeft={8} grow>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    leadingIcon={<Icon name="refresh" size={16} decorative />}
                    onClick={() => setReuploadOpen((v) => !v)}
                  >
                    재업로드
                  </Button>
                </Box>
              </Stack>
            </Box>
            {reuploadOpen && (
              <Box marginTop={8}>
                <DocPreviewCard
                  variant="upload"
                  title="새 등록증 업로드"
                  caption="끌어다 놓거나 클릭하여 선택"
                />
              </Box>
            )}
          </Stack>
        ) : (
          <DocPreviewCard
            variant="upload"
            title="차량등록증 업로드"
            caption="끌어다 놓거나 클릭하여 선택"
          />
        )}
      </Box>

      {/* 상태 요약 — 아이콘 · 라벨 · 값 3줄 카드 */}
      <Box marginTop={16} paddingX={12} paddingY={12} className="bg-gray-50 rounded-md">
        <Stack direction="column">
          <Stack direction="row" align="center">
            <Icon name="directions_car" size={16} decorative />
            <Box
              marginLeft={4}
              width={72}
              className="text-sm-regular text-gray-500"
            >
              차량상태
            </Box>
            <Box grow className="text-sm-regular text-gray-950">
              {row.status}
            </Box>
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleVerified}
              aria-label="인증 상태 전환"
              leadingIcon={<Icon name="swap_horiz" size={16} decorative />}
            >
              전환
            </Button>
          </Stack>
          <Box marginTop={8}>
            <Stack direction="row" align="center">
              <Icon name="description" size={16} decorative />
              <Box
                marginLeft={4}
                width={72}
                className="text-sm-regular text-gray-500"
              >
                등록증
              </Box>
              <Box className="text-sm-regular text-gray-950">
                {verified ? '있음' : '없음'}
              </Box>
            </Stack>
          </Box>
          <Box marginTop={8}>
            <Stack direction="row" align="center">
              <Icon name="edit" size={16} decorative />
              <Box
                marginLeft={4}
                width={72}
                className="text-sm-regular text-gray-500"
              >
                수정 범위
              </Box>
              <Box className="text-sm-regular text-gray-950">
                {verified ? '차대번호 제외' : '전 항목'}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* 하단 기능 버튼 */}
      <Box marginTop={24}>
        <Divider />
      </Box>
      <Box marginTop={12} className="text-xs-regular text-gray-500">
        기능 버튼
      </Box>
      <Box marginTop={8}>
        <Grid columns={2} gap={8}>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="location_on" size={16} decorative />}
            onClick={() => onOpenLocation?.(row)}
          >
            위치수정
          </Button>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="sync" size={16} decorative />}
          >
            DB업데이트
          </Button>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="link_off" size={16} decorative />}
          >
            단말기해제
          </Button>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="power_settings_new" size={16} decorative />}
          >
            시동제어
          </Button>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="sell" size={16} decorative />}
          >
            매각 처리
          </Button>
          <Button
            variant="danger"
            size="sm"
            fullWidth
            leadingIcon={<Icon name="delete" size={16} decorative />}
          >
            삭제
          </Button>
        </Grid>
      </Box>
      <Box marginTop={8} className="text-xs-regular text-gray-400">
        삭제: 서비스DB만 (단말기 미연결)
      </Box>
    </Stack>
  );
}

/* ────────── 중간 · 차량 정보 수정 ────────── */

function MiddlePanel({
  row,
  verified,
}: {
  row: VehicleRow;
  verified: boolean;
}) {
  const [company, setCompany] = useState(row.company);
  const [branch, setBranch] = useState(row.branch);
  const [serverCarCode, setServerCarCode] = useState(row.carCode ?? '');
  const [memo, setMemo] = useState('');
  const [plateNo, setPlateNo] = useState(row.plateNo);
  const [manufacturer, setManufacturer] = useState(row.manufacturer);
  const [model, setModel] = useState(row.model);
  const [subModel, setSubModel] = useState(row.subModel);
  const [firstReg, setFirstReg] = useState('2024-03-15');
  const [fuel, setFuel] = useState(row.fuel);
  const [displacement, setDisplacement] = useState(
    row.fuel === '전기' ? '0 (전기)' : '1,999cc',
  );
  const [length, setLength] = useState('4855');
  const [nextInspection, setNextInspection] = useState('2026-03-15');
  const [commMode, setCommMode] = useState<string>(row.commMode);

  const SERVER_CAR_CODE_OPTIONS = [
    { value: '', label: '선택 안 함' },
    { value: 'HY-IONIQ6-2024', label: 'HY-IONIQ6-2024 (아이오닉 6 · 2024 · 전기)' },
    { value: 'HY-PALI-2023', label: 'HY-PALI-2023 (팰리세이드 · 2023 · 경유)' },
    { value: 'HY-SONATA-2022', label: 'HY-SONATA-2022 (쏘나타 · 2022 · 휘발유)' },
  ];

  const FUEL_OPTIONS = [
    { value: '경유', label: '경유' },
    { value: '휘발유', label: '휘발유' },
    { value: '휘발유(무연)', label: '휘발유(무연)' },
    { value: 'LPG', label: 'LPG' },
    { value: '전기', label: '전기' },
    { value: '하이브리드(경유+전기)', label: '하이브리드(경유+전기)' },
    { value: '하이브리드(휘발유+전기)', label: '하이브리드(휘발유+전기)' },
  ];

  const COMM_MODE_OPTIONS = [
    { value: '', label: '선택' },
    { value: 'OBD', label: 'OBD' },
    { value: 'NonOBD', label: 'NonOBD' },
  ];

  return (
    <Stack direction="column">
      <StepHeader step={2} title="차량 정보 수정" />

      {!verified && (
        <Box marginTop={16}>
          <InlineAlert status="warning">
            차량등록증이 미확인된 차량입니다. 좌측에서 차량 등록증을 업로드해
            주세요.
          </InlineAlert>
        </Box>
      )}

      {/* 서비스 정보 */}
      <Box marginTop={24}>
        <SectionTitle icon="business">서비스 정보</SectionTitle>
      </Box>
      <Box marginTop={16}>
        <Grid columns={2} gap={8}>
          <Select
            label="업체"
            required
            fullWidth
            options={COMPANY_OPTIONS.filter((o) => o.value !== '')}
            value={company}
            onChange={(v) => setCompany(v as string)}
            placeholder="선택"
          />
          <Select
            label="지점"
            required
            fullWidth
            options={BRANCH_OPTIONS.filter((o) => o.value !== '')}
            value={branch}
            onChange={(v) => setBranch(v as string)}
            placeholder="선택"
          />
          <InputField
            label="파트너"
            fullWidth
            disabled
            value="파트너A (자동)"
          />
          <InputField
            label="리셀러"
            fullWidth
            disabled
            value={`${row.reseller} (자동)`}
          />

          <Box className="col-span-2">
            <Select
              label="서버 반영 카코드"
              fullWidth
              options={SERVER_CAR_CODE_OPTIONS}
              value={serverCarCode}
              onChange={(v) => setServerCarCode(v as string)}
              placeholder="선택"
              helperText="선택 시 유종·배기량·길이 자동 채움. 목록: 제조사·모델명·연식 동일한 카코드만 표시."
            />
          </Box>

          <Box className="col-span-2">
            <InputField
              label="메모"
              fullWidth
              value={memo}
              onChange={setMemo}
              placeholder="메모 입력"
            />
          </Box>
        </Grid>
      </Box>

      {/* 차량 정보 */}
      <Box className="mt-10">
        <SectionTitle icon="directions_car">차량 정보</SectionTitle>
      </Box>
      <Box marginTop={16}>
        <Grid columns={2} gap={8}>
          <Box className="col-span-2">
            <InputField
              label="차대번호 (VIN)"
              required
              fullWidth
              value={row.vin}
              disabled={verified}
              helperText={
                verified
                  ? 'Case 2 — 차량등록증 등록됨: 차대번호 읽기 전용. 수정 필요 시 SYS_ADMIN 문의.'
                  : 'Case 1 — 차량등록증 없음: 차대번호 수정 가능.'
              }
            />
          </Box>
          <InputField
            label="차량번호"
            required
            fullWidth
            value={plateNo}
            onChange={setPlateNo}
          />
          <InputField
            label="연식"
            fullWidth
            value={String(row.modelYear)}
            disabled={verified}
          />
          <InputField
            label="제조사"
            required
            fullWidth
            value={manufacturer}
            onChange={setManufacturer}
          />
          <InputField
            label="모델명"
            required
            fullWidth
            value={model}
            onChange={setModel}
          />
          <Box className="col-span-2">
            <InputField
              label={
                <>
                  하위모델명{' '}
                  <span className="text-xs-regular text-gray-400">선택</span>
                </>
              }
              fullWidth
              value={subModel}
              onChange={setSubModel}
              placeholder="소유주 검증 seriesname 자동입력 가능"
            />
          </Box>
          <InputField
            label="최초등록일"
            required
            fullWidth
            value={firstReg}
            onChange={setFirstReg}
          />
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
            label={
              <>
                배기량 (cc){' '}
                <span className="text-xs-regular text-gray-400">선택</span>
              </>
            }
            fullWidth
            value={displacement}
            onChange={setDisplacement}
          />
          <InputField
            label={
              <>
                전체길이 (mm){' '}
                <span className="text-xs-regular text-gray-400">선택</span>
              </>
            }
            fullWidth
            value={length}
            onChange={setLength}
          />
          <InputField
            label={
              <>
                종합검사 주기{' '}
                <span className="text-xs-regular text-gray-400">자동</span>
              </>
            }
            fullWidth
            disabled
            value="매년 (2026-03-15~)"
            helperText="최초 등록일 기준 2년 이후 매년 자동 계산"
          />
          <InputField
            label={
              <>
                다음 종합검사 만기일{' '}
                <span className="text-xs-regular text-gray-400">선택</span>
              </>
            }
            fullWidth
            value={nextInspection}
            onChange={setNextInspection}
          />
        </Grid>
      </Box>

      {/* 단말기 정보 */}
      <Box className="mt-10">
        <SectionTitle icon="memory">단말기 정보</SectionTitle>
      </Box>
      <Box marginTop={12}>
        <InlineAlert status="error">
          단말기 기종 및 단말기 SN은 현장서비스 설치 시 자동 입력, 수정 불가
        </InlineAlert>
      </Box>
      <Box marginTop={16}>
        <Grid columns={2} gap={8}>
          <InputField
            label="단말기 기종"
            fullWidth
            disabled
            value={row.deviceType}
          />
          <InputField
            label="단말기 SN"
            fullWidth
            disabled
            value={row.deviceSN}
          />
          <Select
            label="통신모드"
            fullWidth
            options={COMM_MODE_OPTIONS}
            value={commMode}
            onChange={(v) => setCommMode(v as string)}
            placeholder="선택"
          />
        </Grid>
      </Box>
      {/* 마지막 셀렉트 드롭다운이 스크롤 컨테이너 안에서 잘리지 않도록 하단 여백 확보. */}
      <Box height={120} />
    </Stack>
  );
}

/* ────────── 우측 · 등록증 미리보기 ────────── */

function DocRow({ th, td }: { th: string; td: ReactNode }) {
  return (
    <Grid columns="88px 1fr" className="border-b border-gray-200">
      <Box paddingX={8} paddingY={8} className="bg-gray-100 text-xs-medium text-gray-800">
        {th}
      </Box>
      <Box paddingX={8} paddingY={8} className="text-xs-regular text-gray-950">
        {td}
      </Box>
    </Grid>
  );
}

function DocPreview({ row }: { row: VehicleRow }) {
  return (
    <Box className="bg-white rounded-md border border-gray-200 w-full">
      <Box
        paddingY={12}
        paddingX={12}
        className="text-center text-base-semibold text-gray-950 border-b border-gray-200"
      >
        자동차 등록증
      </Box>
      <DocRow th="차량번호" td={row.plateNo} />
      <DocRow th="차 명" td={row.model} />
      <DocRow th="차대번호" td={<Box className="text-xs-regular">{row.vin}</Box>} />
      <DocRow th="형 식" td="PE3F4D" />
      <DocRow th="연 식" td={String(row.modelYear)} />
      <DocRow th="최초등록일" td="2024.03.15" />
      <DocRow th="사용연료" td={row.fuel} />
      <DocRow th="배기량" td="—" />
      <DocRow th="소유자" td="홍길동" />
      <Box
        paddingX={8}
        paddingY={8}
        className="text-xs-regular text-gray-500"
      >
        <Stack direction="row" align="center" justify="between">
          <span>발급일: 2024.03.15</span>
          <span>시·군·구청장</span>
        </Stack>
      </Box>
    </Box>
  );
}

function RightPanel({
  row,
  verified,
}: {
  row: VehicleRow;
  verified: boolean;
}) {
  return (
    <Stack direction="column">
      <Box className="text-base-semibold text-gray-950">등록증 미리보기</Box>
      <Box marginTop={12}>
        {verified ? (
          <DocPreview row={row} />
        ) : (
          <DocPreviewCard
            variant="upload"
            size="md"
            title="등록증 미확인"
            caption="좌측 패널에서 업로드하세요"
          />
        )}
      </Box>
    </Stack>
  );
}

/* ────────── 메인 컴포넌트 ────────── */

export function VehicleEditModal({
  open,
  onClose,
  row,
  onOpenLocation,
}: VehicleEditModalProps) {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    if (row) setVerified(row.registration !== 'UNVERIFIED');
  }, [row]);

  if (!row) return null;

  const title = `상세보기 — ${row.model}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="xl"
      primaryLabel="저장"
      onPrimary={onClose}
      secondaryLabel="취소"
      onSecondary={onClose}
      disablePadding
    >
      <Grid columns={3} gap={0}>
        <Box
          paddingX={16}
          paddingY={16}
          className="border-r border-gray-200"
        >
          <LeftPanel
            row={row}
            verified={verified}
            onToggleVerified={() => setVerified((v) => !v)}
            onOpenLocation={onOpenLocation}
          />
        </Box>
        <Box paddingX={16} paddingY={16}>
          <MiddlePanel row={row} verified={verified} />
        </Box>
        <Box
          paddingX={16}
          paddingY={16}
          className="border-l border-gray-200 bg-gray-50"
        >
          <RightPanel row={row} verified={verified} />
        </Box>
      </Grid>
    </Modal>
  );
}
