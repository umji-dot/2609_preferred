import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  DetailList,
  HelperText,
  Icon,
  Info,
  Stack,
  TopAppBar,
  VerificationItem,
  toast,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { VERIFY_STEPS } from '../features/verify/types';
import type { StepStatus } from '../features/verify/types';
import type { Job } from '../features/jobs/types';

const SIM_DELAY_MS = 1500;

type StepMap = Record<string, StepStatus>;

type LockPhase =
  | 'idle'
  | 'sending-lock'
  | 'awaiting-lock-confirm'
  | 'unlock-idle'
  | 'sending-unlock'
  | 'awaiting-unlock-confirm'
  | 'complete';

const TO_VERIFICATION_STATUS: Record<StepStatus, 'pending' | 'in-progress' | 'completed' | 'failed'> = {
  pending: 'pending',
  running: 'in-progress',
  completed: 'completed',
  failed: 'failed',
  skipped: 'completed',
};

function buildInitialSteps(isNonObd: boolean): StepMap {
  return {
    step1: 'pending',
    step2: isNonObd ? 'skipped' : 'pending',
    step3: 'pending',
    step4: 'pending',
  };
}

function countCompleted(steps: StepMap): number {
  return Object.values(steps).filter(
    (s) => s === 'completed' || s === 'skipped',
  ).length;
}

function lockSubStatuses(phase: LockPhase): { lock: StepStatus; unlock: StepStatus } {
  switch (phase) {
    case 'idle':
      return { lock: 'pending', unlock: 'pending' };
    case 'sending-lock':
    case 'awaiting-lock-confirm':
      return { lock: 'running', unlock: 'pending' };
    case 'unlock-idle':
    case 'sending-unlock':
    case 'awaiting-unlock-confirm':
      return { lock: 'completed', unlock: 'running' };
    case 'complete':
      return { lock: 'completed', unlock: 'completed' };
  }
}

export default function VerifyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const isNonObd = job?.installType === 'Non-OBD';
  const needsLockTest = !!job?.ignitionLock;

  const [steps, setSteps] = useState<StepMap>(() => buildInitialSteps(isNonObd));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [lockPhase, setLockPhase] = useState<LockPhase>('idle');

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="검증 진행" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const currentStep = VERIFY_STEPS.find(
    (s) => steps[s.id] !== 'completed' && steps[s.id] !== 'skipped',
  );
  const allStepsDone = !currentStep;
  const completedCount = countCompleted(steps);
  const lockSubs = lockSubStatuses(lockPhase);
  const lockCompletedCount = (lockSubs.lock === 'completed' ? 1 : 0) + (lockSubs.unlock === 'completed' ? 1 : 0);
  const allDone = allStepsDone && (!needsLockTest || lockPhase === 'complete');

  useEffect(() => {
    if (!allDone || !job) return;
    toast.success({
      title: '검증 완료',
      description: '모든 검증 단계가 완료되었습니다.',
      duration: 5000,
    });
    const timer = setTimeout(() => {
      navigate(`/jobs/${job.id}/verify-result`);
    }, 5000);
    return () => clearTimeout(timer);
  }, [allDone, job, navigate]);

  const startStep = (stepId: string) => {
    const wasFailed = steps[stepId] === 'failed';
    setSteps((prev) => ({ ...prev, [stepId]: 'running' }));
    setTimeout(() => {
      if (stepId === 'step2' && !wasFailed) {
        setSteps((prev) => ({ ...prev, [stepId]: 'failed' }));
        setErrors((prev) => ({
          ...prev,
          [stepId]:
            '차량 DB 설치 결과가 정상이 아닙니다. 단말기 연결 상태를 재확인해 주세요.',
        }));
      } else {
        setSteps((prev) => ({ ...prev, [stepId]: 'completed' }));
        setErrors((prev) => ({ ...prev, [stepId]: undefined }));
      }
    }, SIM_DELAY_MS);
  };

  const handleLockAction = () => {
    switch (lockPhase) {
      case 'idle':
        setLockPhase('sending-lock');
        setTimeout(() => setLockPhase('awaiting-lock-confirm'), SIM_DELAY_MS);
        break;
      case 'awaiting-lock-confirm':
        setLockPhase('unlock-idle');
        break;
      case 'unlock-idle':
        setLockPhase('sending-unlock');
        setTimeout(() => setLockPhase('awaiting-unlock-confirm'), SIM_DELAY_MS);
        break;
      case 'awaiting-unlock-confirm':
        setLockPhase('complete');
        break;
    }
  };

  const lockCard = getLockCard(lockPhase);

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="검증 진행" onBack={() => navigate(`/jobs/${job.id}/tasks`)} />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        {isNonObd && (
          <Info icon="info" title="Non-OBD 모드 검증" className="bg-neutral-white">
            Step 2(차량 DB 설치)는 자동 패스됩니다. 나머지 단계는 OBD 모드와 동일하게 진행해 주세요.
          </Info>
        )}

        {currentStep && (
          <ActionCard
            stepLabel={currentStep.stepLabel}
            actionTitle={currentStep.actionTitle}
            guideText={currentStep.guideText}
            isRunning={steps[currentStep.id] === 'running'}
            errorMessage={errors[currentStep.id]}
            buttonLabel="시작"
            loadingLabel="진행중..."
            retryLabel="재시도"
            onClick={() => startStep(currentStep.id)}
          />
        )}

        {allStepsDone && needsLockTest && lockPhase !== 'complete' && (
          <SectionBlock
            title="시동 제어 검증"
            completed={lockCompletedCount}
            total={2}
          >
            {lockCard && (
              <ActionCard
                stepLabel={lockCard.subtitle}
                actionTitle={lockCard.title}
                guideText={lockCard.guide ?? ''}
                isRunning={lockCard.isRunning}
                successMessage={lockCard.successMessage}
                buttonLabel={lockCard.buttonLabel}
                loadingLabel={lockCard.loadingLabel}
                retryLabel="재시도"
                buttonVariant={lockCard.buttonVariant}
                onClick={handleLockAction}
              />
            )}
            <DetailList variant="single">
              <VerificationItem
                title="시동 잠금 제어 검증"
                status={TO_VERIFICATION_STATUS[lockSubs.lock]}
                pendingLabel="대기"
                inProgressLabel="진행중..."
                completedLabel="완료"
                failedLabel="실패"
              />
              <VerificationItem
                title="시동 잠금 해제 제어 검증"
                status={TO_VERIFICATION_STATUS[lockSubs.unlock]}
                pendingLabel="대기"
                inProgressLabel="진행중..."
                completedLabel="완료"
                failedLabel="실패"
              />
            </DetailList>
          </SectionBlock>
        )}

        <SectionBlock
          title="검증 진행"
          completed={completedCount}
          total={4}
          marginTop={
            currentStep || (allStepsDone && needsLockTest && lockPhase !== 'complete')
              ? 8
              : 0
          }
        >
          <DetailList variant="single">
            {VERIFY_STEPS.map((s) => {
              const status = steps[s.id];
              const label =
                status === 'skipped' ? '패스 (Non-OBD)'
                : status === 'completed' ? '완료'
                : status === 'running' ? '진행중...'
                : status === 'failed' ? '실패'
                : '대기';
              return (
                <VerificationItem
                  key={s.id}
                  title={s.actionTitle}
                  status={TO_VERIFICATION_STATUS[status]}
                  pendingLabel={label}
                  inProgressLabel={label}
                  completedLabel={label}
                  failedLabel={label}
                />
              );
            })}
          </DetailList>
        </SectionBlock>

      </Stack>

      <Box height={32} />
    </Box>
  );
}

function SectionBlock({
  title,
  completed,
  total,
  marginTop,
  children,
}: {
  title: string;
  completed: number;
  total: number;
  marginTop?: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64;
  children: React.ReactNode;
}) {
  return (
    <Stack direction="column" gap={8} marginTop={marginTop}>
      <Stack direction="row" justify="between" align="center">
        <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
          {title}
        </Box>
        <Stack direction="row" gap={4} align="baseline">
          <Box className="text-caption-15 font-bold text-success">{completed}</Box>
          <Box className="text-caption-15 font-bold text-neutral-500">/ {total}</Box>
        </Stack>
      </Stack>
      {children}
    </Stack>
  );
}

interface LockCardSpec {
  subtitle: string;
  title: string;
  guide?: string;
  successMessage?: string;
  buttonLabel: string;
  loadingLabel: string;
  buttonVariant: 'primary' | 'success';
  isRunning: boolean;
}

function getLockCard(phase: LockPhase): LockCardSpec | null {
  switch (phase) {
    case 'idle':
    case 'sending-lock':
      return {
        subtitle: '시동 잠금 제어 검증',
        title: '잠금·해제 명령 전송',
        guide: '시동잠금 테스트를 위해 차량 시동을 꺼주세요.',
        buttonLabel: '시동 잠금 명령 전송',
        loadingLabel: '시동 잠금 명령 전송중...',
        buttonVariant: 'primary',
        isRunning: phase === 'sending-lock',
      };
    case 'awaiting-lock-confirm':
      return {
        subtitle: '시동 잠금 제어 검증',
        title: '기사님이 차량에서\n직접 시동 잠금을 검증해 주세요!',
        successMessage: '시동 잠금 명령 전송 완료',
        buttonLabel: '차량 시동 잠금 확인 완료',
        loadingLabel: '확인 중...',
        buttonVariant: 'success',
        isRunning: false,
      };
    case 'unlock-idle':
    case 'sending-unlock':
      return {
        subtitle: '시동 잠금 해제 제어 검증',
        title: '잠금 해제 명령 전송',
        guide: '시동 잠금 해제를 위한 명령을 전송합니다.',
        buttonLabel: '시동 잠금 해제 명령 전송',
        loadingLabel: '시동 잠금 해제 명령 전송중...',
        buttonVariant: 'primary',
        isRunning: phase === 'sending-unlock',
      };
    case 'awaiting-unlock-confirm':
      return {
        subtitle: '시동 잠금 해제 제어 검증',
        title: '기사님이 차량에서\n직접 시동 잠금 해제를 검증해 주세요!',
        successMessage: '시동 잠금 해제 명령 전송 완료',
        buttonLabel: '차량 시동 잠금 해제 확인 완료',
        loadingLabel: '확인 중...',
        buttonVariant: 'success',
        isRunning: false,
      };
    case 'complete':
      return null;
  }
}

function ActionCard({
  stepLabel,
  actionTitle,
  guideText,
  isRunning,
  errorMessage,
  successMessage,
  buttonLabel,
  loadingLabel,
  retryLabel,
  buttonVariant = 'primary',
  onClick,
}: {
  stepLabel: string;
  actionTitle: string;
  guideText: string;
  isRunning: boolean;
  errorMessage?: string;
  successMessage?: string;
  buttonLabel: string;
  loadingLabel: string;
  retryLabel: string;
  buttonVariant?: 'primary' | 'success';
  onClick: () => void;
}) {
  const isFailed = !!errorMessage;
  return (
    <Box className="bg-neutral-white border border-neutral-200 rounded-lg-12" padding={16}>
      <Stack direction="column" gap={24}>
        <Stack direction="column" gap={16}>
          <Stack direction="column" gap={4}>
            <Box className="text-micro-14 font-regular text-neutral-600">
              {stepLabel}
            </Box>
            <Box className="text-h2-22 font-bold text-neutral-black whitespace-pre-line">
              {actionTitle}
            </Box>
            {guideText && (
              <Box className="text-body-sm-16 font-regular text-neutral-black">
                {guideText}
              </Box>
            )}
          </Stack>
          {successMessage && (
            <HelperText variant="success">{successMessage}</HelperText>
          )}
          {isFailed && (
            <Stack direction="row" gap={8} align="center">
              <Icon
                name="error"
                size={20}
                filled
                className="text-danger shrink-0"
              />
              <Box className="text-body-sm-16 font-bold text-danger">
                {errorMessage}
              </Box>
            </Stack>
          )}
        </Stack>
        <Button
          variant={isFailed ? 'danger' : buttonVariant}
          size="lg"
          loading={isRunning}
          onClick={onClick}
          className="w-full"
        >
          {isRunning ? loadingLabel : isFailed ? retryLabel : buttonLabel}
        </Button>
      </Stack>
    </Box>
  );
}
