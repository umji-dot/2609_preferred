import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  Checkbox,
  DetailList,
  DetailRow,
  Info,
  Stack,
  TopAppBar,
  VerificationItem,
  toast,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import type { Job, VerifyResultStatus } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;
const MAX_RETRY = 5;

const STATUS_LABEL: Record<VerifyResultStatus, string> = {
  normal: '정상',
  abnormal: '비정상',
};

const STATUS_TO_VERIFICATION: Record<VerifyResultStatus, 'completed' | 'failed'> = {
  normal: 'completed',
  abnormal: 'failed',
};

export default function VerifyResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const [gpsShadowChecked, setGpsShadowChecked] = useState(false);

  if (!job || !job.verifyResult) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="검증 결과" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          검증 결과를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const r = job.verifyResult;
  const retryCount = r.retryCount ?? 0;
  const retryLeft = Math.max(0, MAX_RETRY - retryCount);

  const powerAbnormal = r.powerResult === 'abnormal';
  const ignitionAbnormal = r.ignitionResult === 'abnormal';
  const lockAbnormal = r.ignitionLockResult === 'abnormal';
  const gpsAbnormal = r.gpsResult === 'abnormal';

  const needsRecheck = powerAbnormal || ignitionAbnormal || lockAbnormal;
  const canRetry = needsRecheck && retryLeft > 0;
  const gpsResolved = !gpsAbnormal || gpsShadowChecked;
  const canComplete = !needsRecheck && gpsResolved;

  const handleComplete = () => {
    if (!canComplete) return;
    sessionStorage.removeItem(`install-completed-${job.id}`);
    toast.success({
      title: '작업 완료',
      description: '작업이 정상적으로 완료 처리되었습니다.',
      duration: 3000,
    });
    setTimeout(() => navigate('/jobs'), 2000);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="검증 결과" onBack={() => navigate(`/jobs/${job.id}/verify`)} />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        {needsRecheck && retryLeft > 0 && (
          <Info icon="error" title="검증 실패 항목이 있습니다" className="bg-neutral-white">
            아래 비정상 항목을 확인하고 [재검증]으로 다시 시도하거나 [재작업]으로 설치 프로세스를 재진행해 주세요. (재검증 가능 {retryLeft}회 남음)
          </Info>
        )}
        {needsRecheck && retryLeft === 0 && (
          <Info icon="error" title="재검증 횟수를 모두 사용했습니다" className="bg-neutral-white">
            재검증 횟수 5회를 모두 소진하였습니다. [재작업] 버튼으로 설치 프로세스를 재진행해 주세요.
          </Info>
        )}

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            검증 결과 정보
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="단말기 기종" className="max-h-24">{r.deviceModel}</DetailRow>
            <DetailRow label="단말기 SN" className="max-h-24">{r.deviceSn}</DetailRow>
            <DetailRow label="디지털차키 설치 여부" className="max-h-24">
              <span className={r.digitalKey ? 'text-success' : 'text-neutral-500'}>
                {r.digitalKey ? '설치' : '미설치'}
              </span>
            </DetailRow>
            <DetailRow label="시동잠금 설치 여부" className="max-h-24">
              <span className={r.ignitionLock ? 'text-success' : 'text-neutral-500'}>
                {r.ignitionLock ? '설치' : '미설치'}
              </span>
            </DetailRow>
            <DetailRow label="GPS 좌표" className="max-h-24">{r.gpsCoords}</DetailRow>
            <DetailRow label="총 주행거리" className="max-h-24">
              {r.mileage.toLocaleString()} km
            </DetailRow>
            <DetailRow label="연료잔량" className="max-h-24">{r.fuelLevel}%</DetailRow>
          </DetailList>
        </Stack>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            검증 결과
          </Box>
          <DetailList variant="single">
            <VerificationItem
              title="단말기 전원연결 결과"
              status={STATUS_TO_VERIFICATION[r.powerResult]}
              completedLabel={STATUS_LABEL[r.powerResult]}
              failedLabel={STATUS_LABEL[r.powerResult]}
            />
            <VerificationItem
              title="시동감지 결과"
              status={STATUS_TO_VERIFICATION[r.ignitionResult]}
              completedLabel={STATUS_LABEL[r.ignitionResult]}
              failedLabel={STATUS_LABEL[r.ignitionResult]}
            />
            {r.ignitionLockResult && (
              <VerificationItem
                title="시동잠금 제어 검증 결과"
                status={STATUS_TO_VERIFICATION[r.ignitionLockResult]}
                completedLabel={STATUS_LABEL[r.ignitionLockResult]}
                failedLabel={STATUS_LABEL[r.ignitionLockResult]}
              />
            )}
            <VerificationItem
              title="GPS 감도 확인 결과"
              status={STATUS_TO_VERIFICATION[r.gpsResult]}
              completedLabel={STATUS_LABEL[r.gpsResult]}
              failedLabel={STATUS_LABEL[r.gpsResult]}
            />
          </DetailList>
        </Stack>

        {gpsAbnormal && (
          <Box
            className="bg-neutral-white border border-neutral-200 rounded-lg-12"
            padding={16}
          >
            <Stack direction="column" gap={4}>
              <Checkbox
                checked={gpsShadowChecked}
                onChange={(e) => setGpsShadowChecked(e.target.checked)}
              >
                음영지역이라 GPS 감도 확인이 불가능합니다
              </Checkbox>
              <Box className="text-caption-15 font-regular text-neutral-600">
                체크하시면 GPS 비정상이라도 작업 완료가 가능합니다.
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>

      <Box height={140} />

      <Box
        className="fixed bottom-0 left-0 right-0 bg-neutral-white border-t border-neutral-200"
        style={{ zIndex: BOTTOM_BAR_Z }}
      >
        <Stack direction="row" gap={8} padding={16}>
          {needsRecheck && (
            <Button
              variant="danger"
              size="lg"
              disabled={!canRetry}
              onClick={() => navigate(`/jobs/${job.id}/verify`)}
              className="flex-1"
            >
              재검증
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              sessionStorage.removeItem(`install-completed-${job.id}`);
              navigate(`/jobs/${job.id}/tasks`);
            }}
            className="flex-1"
          >
            재작업
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={!canComplete}
            onClick={handleComplete}
            className="flex-1"
          >
            작업 완료
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
