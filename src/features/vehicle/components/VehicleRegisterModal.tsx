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
  RadioGroup,
  Radio,
} from 'fms-staff-design-system';
import {
  COMPANY_OPTIONS,
  BRANCH_OPTIONS,
} from '../mocks';
import {
  BRANDS_BY_ORIGIN,
  MODELS_BY_BRAND,
  FUEL_OPTIONS,
} from '../../car-code/mocks';

export interface VehicleRegisterModalProps {
  open: boolean;
  onClose: () => void;
}

type PathMode = 'A' | 'B' | 'C';
type SubMode = 'BA' | 'BB';

const SERVER_CAR_CODE_OPTIONS = [
  { value: '', label: '선택 안 함' },
  { value: 'HY-IONIQ6-2024', label: 'HY-IONIQ6-2024 (아이오닉 6 · 2024 · 전기)' },
  { value: 'HY-PALI-2023', label: 'HY-PALI-2023 (팰리세이드 · 2023 · 경유)' },
  { value: 'HY-SONATA-2022', label: 'HY-SONATA-2022 (쏘나타 · 2022 · 휘발유)' },
  { value: 'BMW-5SER-2023', label: 'BMW-5SER-2023 (5시리즈 · 2023 · 경유)' },
];

const FUEL_SELECT_OPTIONS = [
  { value: '', label: '자동 채움 예정' },
  ...FUEL_OPTIONS,
];

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

const STAGING_LIMIT = 10;

type OcrState = 'idle' | 'loading' | 'done' | 'fail';

const OCR_STEPS = [
  { label: '파일 검증', hint: '파일 형식 · 용량 확인' },
  { label: '등록증 확인', hint: '차량등록증 여부 검증' },
  { label: '등록증 분석', hint: 'OCR 결과 추출 (약 15~30초)' },
];

function OcrStepRow({
  index,
  label,
  hint,
  status,
}: {
  index: number;
  label: string;
  hint: string;
  status: 'done' | 'active' | 'pending';
}) {
  return (
    <Stack direction="row" align="center">
      <Box
        width={24}
        height={24}
        className={`shrink-0 rounded-full inline-flex items-center justify-center ${
          status === 'done'
            ? 'bg-success text-white'
            : status === 'active'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-400'
        }`}
      >
        {status === 'done' ? (
          <Icon name="check" size={16} decorative />
        ) : status === 'active' ? (
          <Box className="animate-spin inline-flex">
            <Icon name="progress_activity" size={16} decorative />
          </Box>
        ) : (
          <Box className="text-xs-medium">{index + 1}</Box>
        )}
      </Box>
      <Box marginLeft={12} grow>
        <Box
          className={`text-sm-medium ${
            status === 'pending' ? 'text-gray-400' : 'text-gray-950'
          }`}
        >
          {label}
        </Box>
        <Box className="text-xs-regular text-gray-500">{hint}</Box>
      </Box>
    </Stack>
  );
}

/**
 * 차량등록증 업로드 드롭존. 클릭 시 OCR 시뮬레이션 (파일 검증 → 등록증 확인 → 분석 → 완료).
 * PRD/목업의 dz-idle · dz-loading(3-step + 진행률) · dz-done · dz-fail 상태를 그대로 재현.
 * done 상태 진입 시 onDone 콜백으로 상위에 알려 등록 예정 목록에 자동 추가.
 */
function DocDropZone({
  onDone,
  onStateChange,
}: {
  onDone?: () => void;
  onStateChange?: (s: OcrState) => void;
}) {
  const [state, setState] = useState<OcrState>('idle');
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onStateChange?.(state);
    if (state !== 'loading') return;
    const stepTimers = [
      setTimeout(() => setStepIndex(1), 1400),
      setTimeout(() => setStepIndex(2), 2800),
      setTimeout(() => {
        setState('done');
        setProgress(100);
        onDone?.();
      }, 5400),
    ];
    const progressInterval = setInterval(() => {
      setProgress((p) => (p < 95 ? p + 3 : p));
    }, 150);
    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [state, onDone, onStateChange]);

  const handleClick = () => {
    if (state === 'loading') return;
    setStepIndex(0);
    setProgress(0);
    setState('loading');
  };

  return (
    <Box
      onClick={handleClick}
      paddingY={16}
      paddingX={16}
      className={`rounded-md border border-dashed cursor-pointer transition-colors ${
        state === 'fail'
          ? 'bg-error-subtle border-error'
          : state === 'done'
            ? 'bg-success-subtle border-success'
            : 'bg-gray-50 border-gray-300'
      }`}
    >
      {state === 'idle' && (
        <Stack direction="column" align="center">
          <Box className="text-gray-500 inline-flex">
            <Icon name="cloud_upload" size={32} filled decorative />
          </Box>
          <Box className="text-sm-medium text-gray-950">
            차량등록증 업로드
          </Box>
          <Box marginTop={4} className="text-xs-regular text-gray-500">
            끌어다 놓거나 클릭하여 선택
          </Box>
        </Stack>
      )}

      {state === 'loading' && (
        <Stack direction="column">
          <Stack direction="row" align="center">
            <Box className="animate-spin inline-flex text-primary">
              <Icon name="progress_activity" size={20} decorative />
            </Box>
            <Box marginLeft={8} className="text-sm-medium text-primary">
              차량등록증 분석 중
            </Box>
          </Stack>
          <Box marginTop={12}>
            <Stack direction="column">
              {OCR_STEPS.map((step, i) => (
                <Box key={i} marginTop={i === 0 ? 0 : 8}>
                  <OcrStepRow
                    index={i}
                    label={step.label}
                    hint={step.hint}
                    status={
                      i < stepIndex
                        ? 'done'
                        : i === stepIndex
                          ? 'active'
                          : 'pending'
                    }
                  />
                </Box>
              ))}
            </Stack>
          </Box>
          <Box marginTop={16}>
            <Box
              height={6}
              className="bg-white rounded-full overflow-hidden border border-gray-200"
            >
              <Box
                height={6}
                className="bg-primary rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </Box>
            <Box marginTop={4} className="text-right text-xs-regular text-gray-500">
              {Math.min(progress, 100)}%
            </Box>
          </Box>
        </Stack>
      )}

      {state === 'done' && (
        <Stack direction="column" align="center">
          <Box
            width={32}
            height={32}
            className="text-success inline-flex items-center justify-center"
          >
            <Icon name="check_circle" size={32} filled decorative />
          </Box>
          <Box marginTop={8} className="text-sm-medium text-success">
            OCR 완료 · 목록에 추가됨
          </Box>
          <Box marginTop={4} className="text-xs-regular text-gray-500">
            다음 등록증을 업로드하거나 [등록하기]를 누르세요.
          </Box>
        </Stack>
      )}

      {state === 'fail' && (
        <Stack direction="column" align="center">
          <Box
            width={32}
            height={32}
            className="text-error inline-flex items-center justify-center"
          >
            <Icon name="error" size={32} filled decorative />
          </Box>
          <Box marginTop={8} className="text-sm-medium text-error">
            등록증을 인식할 수 없습니다
          </Box>
          <Box marginTop={4} className="text-xs-regular text-gray-500">
            올바른 차량등록증 이미지를 다시 업로드해 주세요.
          </Box>
        </Stack>
      )}
    </Box>
  );
}

/* ────────── 좌측 · Path 선택 ────────── */

function PathOptionCard({
  active,
  onClick,
  icon,
  title,
  desc,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  desc: string;
  badge?: ReactNode;
}) {
  return (
    <Box
      onClick={onClick}
      paddingX={12}
      paddingY={12}
      className={`min-h-16 rounded-md border cursor-pointer ${
        active
          ? 'border-primary bg-info-subtle'
          : 'border-gray-200 bg-white'
      }`}
    >
      <Stack direction="row" align="center">
        <Box
          width={32}
          height={32}
          className={`rounded-full inline-flex items-center justify-center shrink-0 ${
            active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <Icon name={icon} size={16} filled decorative />
        </Box>
        <Box marginLeft={12} grow>
          <Stack direction="column">
            <Stack direction="row" align="center">
              <Box className="text-sm-medium text-gray-950">{title}</Box>
              {badge && <Box marginLeft={4}>{badge}</Box>}
            </Stack>
            <Box className="text-xs-regular text-gray-400">{desc}</Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function PathTabs({
  path,
  onChange,
}: {
  path: PathMode;
  onChange: (p: PathMode) => void;
}) {
  return (
    <Stack direction="column">
      <PathOptionCard
        active={path === 'A'}
        onClick={() => onChange('A')}
        icon="description"
        title="등록증 업로드"
        desc="차량등록증을 올리면 OCR로 자동 채웁니다"
        badge={<Box className="text-success text-xs-medium">(추천)</Box>}
      />
      <Box marginTop={8}>
        <PathOptionCard
          active={path === 'B'}
          onClick={() => onChange('B')}
          icon="search"
          title="소유주 검증 조회"
          desc="차량번호 또는 차대번호로 자동 조회합니다"
        />
      </Box>
      <Box marginTop={8}>
        <PathOptionCard
          active={path === 'C'}
          onClick={() => onChange('C')}
          icon="edit"
          title="직접 입력하기"
          desc="차량 정보를 수동으로 입력해 등록합니다"
        />
      </Box>
    </Stack>
  );
}

type PathBResult = 'idle' | 'success' | 'fail';

function PathBPanel({
  subMode,
  onSubModeChange,
  result,
  onQuery,
  onSwitchToDirect,
}: {
  subMode: SubMode;
  onSubModeChange: (m: SubMode) => void;
  result: PathBResult;
  onQuery: () => void;
  onSwitchToDirect: () => void;
}) {
  const [plate, setPlate] = useState('');
  const [ownerType, setOwnerType] = useState('individual');
  const [ownerName, setOwnerName] = useState('');
  const [vin, setVin] = useState('');

  return (
    <Stack direction="column">
      <RadioGroup
        name="path-b-sub"
        value={subMode}
        onChange={(v) => onSubModeChange(v as SubMode)}
        orientation="horizontal"
      >
        <Radio value="BA" label="차량번호+소유자명" />
        <Radio value="BB" label="차대번호(VIN)" />
      </RadioGroup>
      <Box marginTop={24} paddingX={12} paddingY={12} className="bg-gray-50 rounded-md">
        {subMode === 'BA' ? (
          <Stack direction="column">
            <InputField
              label="차량번호"
              required
              fullWidth
              value={plate}
              onChange={setPlate}
              placeholder="예: 12가3456"
            />
            <Box marginTop={12}>
              <Box as="label" className="text-sm-regular">
                <span>소유자 유형</span>
                <span className="text-error ml-0.5">*</span>
              </Box>
              <Box marginTop={4}>
                <RadioGroup
                  name="reg-owner-type"
                  value={ownerType}
                  onChange={setOwnerType}
                  orientation="horizontal"
                >
                  <Radio value="individual" label="개인" />
                  <Radio value="corporation" label="법인" />
                </RadioGroup>
              </Box>
            </Box>
            <Box marginTop={12}>
              <InputField
                label={ownerType === 'individual' ? '소유자명' : '법인명'}
                required
                fullWidth
                value={ownerName}
                onChange={setOwnerName}
                placeholder={ownerType === 'individual' ? '소유자명' : '법인명'}
              />
            </Box>
            <Box marginTop={12}>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={onQuery}
                leadingIcon={<Icon name="search" size={16} decorative />}
              >
                조회
              </Button>
            </Box>
          </Stack>
        ) : (
          <Stack direction="column">
            <InputField
              label="차대번호 (VIN) 17자리"
              required
              fullWidth
              value={vin}
              onChange={setVin}
              placeholder="예: KMHGN41GP8A123456"
            />
            <Box marginTop={12}>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={onQuery}
                leadingIcon={<Icon name="search" size={16} decorative />}
              >
                조회
              </Button>
            </Box>
          </Stack>
        )}
      </Box>

      {/* 조회 결과 배너 */}
      {result === 'success' && (
        <Box marginTop={12}>
          <InlineAlert status="success">
            차량 정보가 자동으로 입력되었습니다. 하단의 [목록에 추가] 버튼으로
            등록 예정 목록에 추가하세요.
          </InlineAlert>
        </Box>
      )}
      {result === 'fail' && (
        <Box marginTop={12}>
          <InlineAlert status="warning">
            차량을 찾을 수 없습니다. 정보를 다시 확인해 주세요.
          </InlineAlert>
          <Box marginTop={8}>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              leadingIcon={<Icon name="edit" size={16} decorative />}
              onClick={onSwitchToDirect}
            >
              직접 입력하기
            </Button>
          </Box>
        </Box>
      )}
    </Stack>
  );
}

interface StagingItem {
  id: string;
  plateNo: string;
  verified: boolean;
}

function StagingList({
  items,
  onRemove,
}: {
  items: StagingItem[];
  onRemove: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <Box
        paddingY={16}
        className="text-center text-sm-regular text-gray-500"
      >
        아직 추가된 차량이 없습니다.
      </Box>
    );
  }
  return (
    <Stack direction="column">
      {items.map((item, idx) => (
        <Box key={item.id} marginTop={idx === 0 ? 0 : 4}>
          <Stack direction="row" align="center">
            <Box
              width={22}
              height={22}
              className="shrink-0 rounded-full bg-gray-100 text-gray-500 inline-flex items-center justify-center text-xs-medium"
            >
              {idx + 1}
            </Box>
            <Box marginLeft={8} grow>
              <Box className="text-sm-medium text-gray-950">
                {item.plateNo}
              </Box>
            </Box>
            <Badge status={item.verified ? 'success' : 'neutral'} showDot>
              {item.verified ? '검증' : '미검증'}
            </Badge>
            <Box marginLeft={4}>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="삭제"
                onClick={() => onRemove(item.id)}
              >
                <span className="text-error inline-flex">
                  <Icon name="delete" size={16} decorative />
                </span>
              </Button>
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

function LeftPanel({
  path,
  onPathChange,
  subMode,
  onSubModeChange,
  stagingItems,
  onAddStaging,
  onRemoveStaging,
  onOcrStateChange,
}: {
  path: PathMode;
  onPathChange: (p: PathMode) => void;
  subMode: SubMode;
  onSubModeChange: (m: SubMode) => void;
  stagingItems: StagingItem[];
  onAddStaging: (source: PathMode) => void;
  onRemoveStaging: (id: string) => void;
  onOcrStateChange?: (s: OcrState) => void;
}) {
  const [pathBResult, setPathBResult] = useState<PathBResult>('idle');
  const [queryCount, setQueryCount] = useState(0);

  const handleQuery = () => {
    // 데모 시나리오 — 첫 조회는 성공, 이후 조회는 실패
    setQueryCount((c) => c + 1);
    setPathBResult(queryCount === 0 ? 'success' : 'fail');
  };

  const handleSwitchToC = () => {
    setPathBResult('idle');
    onPathChange('C');
  };

  return (
    <Stack direction="column">
      <StepHeader step={1} title="차량 정보 가져오기" />

      {/* Path 탭 A/B/C — 세로 3개 버튼 */}
      <Box marginTop={16}>
        <PathTabs path={path} onChange={onPathChange} />
      </Box>

      {/* Path 별 패널 */}
      <Box marginTop={16}>
        {path === 'A' && (
          <DocDropZone
            onDone={() => onAddStaging('A')}
            onStateChange={onOcrStateChange}
          />
        )}
        {path === 'B' && (
          <PathBPanel
            subMode={subMode}
            onSubModeChange={onSubModeChange}
            result={pathBResult}
            onQuery={handleQuery}
            onSwitchToDirect={handleSwitchToC}
          />
        )}
        {path === 'C' && (
          <InlineAlert status="warning">
            등록증 업로드·조회가 모두 실패한 경우 직접 입력합니다.
          </InlineAlert>
        )}
      </Box>

      {/* 등록 예정 목록 */}
      <Box className="mt-10">
        <Stack direction="row" align="center" justify="between">
          <Stack direction="row" align="center">
            <Icon name="list_alt" size={16} filled decorative />
            <Box marginLeft={4} className="text-base-semibold text-gray-950">
              등록 예정 목록
            </Box>
          </Stack>
          <Box className="text-xs-regular text-gray-400">
            <strong>{stagingItems.length}</strong>/{STAGING_LIMIT}건
          </Box>
        </Stack>
        <Box marginTop={8}>
          <Divider />
        </Box>
        <Box marginTop={12}>
          <StagingList items={stagingItems} onRemove={onRemoveStaging} />
        </Box>
      </Box>
    </Stack>
  );
}

/* ────────── 중간 · 차량 정보 입력 ────────── */

function MiddlePanel() {
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [serverCarCode, setServerCarCode] = useState('');
  const [vin, setVin] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');
  const [origin, setOrigin] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [subModel, setSubModel] = useState('');
  const [firstReg, setFirstReg] = useState('');
  const [fuel, setFuel] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [length, setLength] = useState('');
  const [nextInspection, setNextInspection] = useState('');

  const brandOptions = origin ? BRANDS_BY_ORIGIN[origin] ?? [] : [];
  const modelOptions = brand ? MODELS_BY_BRAND[brand] ?? [] : [];

  return (
    <Stack direction="column">
      <StepHeader step={2} title="차량 정보 확인 및 입력" />

      {/* 서비스 정보 */}
      <Box marginTop={24}>
        <SectionTitle icon="business">서비스 정보</SectionTitle>
      </Box>
      <Box marginTop={16}>
        <Grid columns={2} gap={16}>
          <Box className="col-span-2">
            <Select
              label="업체"
              required
              fullWidth
              options={COMPANY_OPTIONS.filter((o) => o.value !== '')}
              value={company}
              onChange={(v) => setCompany(v as string)}
              placeholder="선택"
            />
          </Box>
          <Box className="col-span-2">
            <Select
              label="지점"
              required
              fullWidth
              options={BRANCH_OPTIONS.filter((o) => o.value !== '')}
              value={branch}
              onChange={(v) => setBranch(v as string)}
              placeholder="선택"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label={
                <>
                  파트너{' '}
                  <span className="text-xs-regular text-gray-400">자동선택</span>
                </>
              }
              fullWidth
              disabled
              value=""
              placeholder="업체·지점 선택 후 자동"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label={
                <>
                  리셀러{' '}
                  <span className="text-xs-regular text-gray-400">자동선택</span>
                </>
              }
              fullWidth
              disabled
              value=""
              placeholder="업체·지점 선택 후 자동"
            />
          </Box>
          <Box className="col-span-2">
            <Select
              label="서버 반영 카코드 (선택)"
              fullWidth
              options={SERVER_CAR_CODE_OPTIONS}
              value={serverCarCode}
              onChange={(v) => setServerCarCode(v as string)}
              placeholder="선택 안 함"
            />
          </Box>
        </Grid>
      </Box>

      {/* 차량 정보 */}
      <Box className="mt-10">
        <SectionTitle icon="directions_car">차량 정보</SectionTitle>
      </Box>
      <Box marginTop={16}>
        <Grid columns={2} gap={16}>
          <Box className="col-span-2">
            <InputField
              label="차대번호 (VIN)"
              required
              fullWidth
              value={vin}
              onChange={setVin}
              placeholder="등록증 업로드 후 자동 채움"
              helperText="17자리 영문+숫자 (I·O·Q 제외)"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label="차량번호"
              required
              fullWidth
              value={plate}
              onChange={setPlate}
              placeholder="자동 채움 예정"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label="연식"
              required
              fullWidth
              value={year}
              onChange={setYear}
              placeholder="자동 채움 예정"
              helperText="VIN 10번째 자리(ISO 3779) 기반 자동 산출."
            />
          </Box>
          <Box className="col-span-2">
            <Stack direction="column">
              <Box as="label" className="text-sm-regular">
                <span>국산 / 수입</span>
                <span className="text-error ml-0.5">*</span>
              </Box>
              <Box marginTop={4}>
                <RadioGroup
                  name="reg-origin"
                  value={origin}
                  onChange={(v) => {
                    setOrigin(v);
                    setBrand('');
                    setModel('');
                  }}
                  orientation="horizontal"
                >
                  <Radio value="domestic" label="국산" />
                  <Radio value="import" label="수입" />
                </RadioGroup>
              </Box>
            </Stack>
          </Box>
          <Box className="col-span-2">
            <Select
              label="제조사"
              required
              fullWidth
              options={brandOptions}
              value={brand}
              onChange={(v) => {
                setBrand(v as string);
                setModel('');
              }}
              placeholder={origin ? '선택' : '국산/수입 선택 후'}
              disabled={!origin}
            />
          </Box>
          <Box className="col-span-2">
            <Select
              label="모델명"
              required
              fullWidth
              options={modelOptions}
              value={model}
              onChange={(v) => setModel(v as string)}
              placeholder={brand ? '선택' : '제조사 선택 후'}
              disabled={!brand}
            />
          </Box>
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
              placeholder="소유주 검증 시 자동 채움 (직접 입력 가능)"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label="최초등록일"
              required
              fullWidth
              value={firstReg}
              onChange={setFirstReg}
              placeholder="자동 채움 / YYYY-MM-DD"
            />
          </Box>
          <Box className="col-span-2">
            <Select
              label="유종"
              required
              fullWidth
              options={FUEL_SELECT_OPTIONS}
              value={fuel}
              onChange={(v) => setFuel(v as string)}
              placeholder="자동 채움 예정"
            />
          </Box>
          <Box className="col-span-2">
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
              placeholder="자동 채움 예정"
            />
          </Box>
          <Box className="col-span-2">
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
              placeholder="카코드 선택 시 자동 채움"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label={
                <>
                  종합검사 주기{' '}
                  <span className="text-xs-regular text-gray-400">자동</span>
                </>
              }
              fullWidth
              disabled
              value=""
              placeholder="최초등록일 기준 자동 계산"
              helperText="사업용 승용차: 최초 등록일 기준 2년 이후 매년 자동 계산"
            />
          </Box>
          <Box className="col-span-2">
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
              placeholder="YYYY-MM-DD (자동 계산 또는 직접 입력)"
            />
          </Box>
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
        <Grid columns={2} gap={16}>
          <Box className="col-span-2">
            <InputField
              label="단말기 기종"
              fullWidth
              disabled
              value=""
              placeholder="설치 후 자동 표시"
            />
          </Box>
          <Box className="col-span-2">
            <InputField
              label="단말기 SN"
              fullWidth
              disabled
              value=""
              placeholder="설치 후 자동 표시"
            />
          </Box>
        </Grid>
      </Box>
      <Box height={120} />
    </Stack>
  );
}

/* ────────── 우측 · 등록증 미리보기 ────────── */

function RightPanel({ path }: { path: PathMode }) {
  return (
    <Stack direction="column">
      <Box className="text-base-semibold text-gray-950">등록증 미리보기</Box>
      <Box marginTop={12}>
        <Box
          paddingY={64}
          paddingX={24}
          className="bg-white rounded-md border border-gray-200 text-center"
        >
          {path === 'A' && (
            <Stack direction="column" align="center">
              <Box
                width={32}
                height={32}
                className="text-gray-400 inline-flex items-center justify-center"
              >
                <Icon name="description" size={32} decorative />
              </Box>
              <Box marginTop={8} className="text-sm-medium text-gray-500">
                등록증 업로드 시 표시됨
              </Box>
            </Stack>
          )}
          {path === 'B' && (
            <Stack direction="column" align="center">
              <Box
                width={32}
                height={32}
                className="text-gray-400 inline-flex items-center justify-center"
              >
                <Icon name="search" size={32} decorative />
              </Box>
              <Box marginTop={8} className="text-sm-medium text-gray-500">
                차량번호 조회 후 API 정보 자동 입력
              </Box>
            </Stack>
          )}
          {path === 'C' && (
            <Stack direction="column" align="center">
              <Box
                width={32}
                height={32}
                className="text-gray-400 inline-flex items-center justify-center"
              >
                <Icon name="edit" size={32} decorative />
              </Box>
              <Box marginTop={8} className="text-sm-medium text-gray-500">
                직접 입력 모드
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

/* ────────── 메인 컴포넌트 ────────── */

export function VehicleRegisterModal({
  open,
  onClose,
}: VehicleRegisterModalProps) {
  const [path, setPath] = useState<PathMode>('A');
  const [subMode, setSubMode] = useState<SubMode>('BA');
  const [stagingItems, setStagingItems] = useState<StagingItem[]>([]);
  const [, setOcrState] = useState<OcrState>('idle');

  const canAddMore = stagingItems.length < STAGING_LIMIT;
  const submitLabel =
    stagingItems.length > 0
      ? `등록하기 (${stagingItems.length}건)`
      : '등록하기';

  const handleAddStaging = (source: PathMode) => {
    if (!canAddMore) return;
    setStagingItems((prev) => [
      ...prev,
      {
        id: `stg-${Date.now()}`,
        plateNo: `12가${1000 + prev.length}`,
        verified: source === 'A',
      },
    ]);
  };

  const handleRemoveStaging = (id: string) => {
    setStagingItems((prev) => prev.filter((s) => s.id !== id));
  };

  const resetAndClose = () => {
    setStagingItems([]);
    setPath('A');
    setSubMode('BA');
    onClose();
  };

  const handleCancel = () => {
    if (stagingItems.length === 0) {
      resetAndClose();
      return;
    }
    const ok = window.confirm(
      `등록 예정 ${stagingItems.length}건이 있습니다. 취소 시 초기화됩니다. 계속하시겠어요?`,
    );
    if (ok) resetAndClose();
  };

  const showAddButton = path === 'B' || path === 'C';

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title="차량 등록"
      size="xl"
      disablePadding
      footer={
        <Stack direction="row" align="center" justify="between">
          {/* 좌측 — 부가 액션(목록에 추가 등). 없는 경우 빈 자리 확보용 spacer. */}
          <Box>
            {showAddButton && (
              <Button
                variant="secondary"
                size="md"
                leadingIcon={<Icon name="add" size={16} decorative />}
                disabled={!canAddMore}
                onClick={() => handleAddStaging(path)}
              >
                목록에 추가
              </Button>
            )}
          </Box>
          {/* 우측 — 취소 · 저장/등록 나란히. */}
          <Stack direction="row" align="center">
            <Button variant="secondary" size="md" onClick={handleCancel}>
              취소
            </Button>
            <Box marginLeft={8}>
              <Button variant="primary" size="md" onClick={resetAndClose}>
                {submitLabel}
              </Button>
            </Box>
          </Stack>
        </Stack>
      }
    >
      <Grid columns={3} gap={0}>
        <Box
          paddingX={16}
          paddingY={16}
          className="border-r border-gray-200"
        >
          <LeftPanel
            path={path}
            onPathChange={setPath}
            subMode={subMode}
            onSubModeChange={setSubMode}
            stagingItems={stagingItems}
            onAddStaging={handleAddStaging}
            onRemoveStaging={handleRemoveStaging}
            onOcrStateChange={setOcrState}
          />
        </Box>
        <Box paddingX={16} paddingY={16}>
          <MiddlePanel />
        </Box>
        <Box
          paddingX={16}
          paddingY={16}
          className="border-l border-gray-200 bg-gray-50"
        >
          <RightPanel path={path} />
        </Box>
      </Grid>
    </Modal>
  );
}
