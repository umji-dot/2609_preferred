import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  DetailList,
  DetailRow,
  HelperText,
  Input,
  Stack,
  StepIndicator,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { getInstallStepCounts } from '../features/install/steps';
import type { Job } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;

export default function SettingsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const [serialNumber, setSerialNumber] = useState('');
  const [mileage, setMileage] = useState('');

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="설정 입력" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const canSubmit = serialNumber.trim().length > 0 && mileage.trim().length > 0;

  const handleNext = () => {
    if (!canSubmit) return;
    navigate(`/jobs/${job.id}/reference-images`);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title="설정 입력"
        onBack={() => navigate(`/jobs/${job.id}/tasks`)}
      />

      <Box paddingX={16} paddingTop={16}>
        <StepIndicator {...getInstallStepCounts(job, 'settings')} />
      </Box>

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Stack direction="column" gap={24}>
          <Input
            label="단말기 일련번호"
            placeholder="단말기에 표기된 일련번호 입력"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            onClear={() => setSerialNumber('')}
            required
            autoComplete="off"
          />
          <Input
            label="총 주행거리 (km)"
            placeholder="계기판 표시값 직접 입력"
            value={mileage}
            onChange={(e) => setMileage(e.target.value.replace(/[^0-9]/g, ''))}
            onClear={() => setMileage('')}
            required
            inputMode="numeric"
            autoComplete="off"
          />
        </Stack>

        <Stack direction="column" gap={8} marginTop={24}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            운영팀 설정
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="디지털 차키" className="max-h-24">
              <span className={job.digitalKey ? 'text-success' : 'text-neutral-500'}>
                {job.digitalKey ? '설치' : '미설치'}
              </span>
            </DetailRow>
            <DetailRow label="시동잠금" className="max-h-24">
              <span className={job.ignitionLock ? 'text-success' : 'text-neutral-500'}>
                {job.ignitionLock ? '설치' : '미설치'}
              </span>
            </DetailRow>
          </DetailList>
          <HelperText variant="info">변경이 필요한 경우 운영팀에 문의해 주세요.</HelperText>
        </Stack>
      </Stack>

      <Box height={120} />

      <Box
        className="fixed bottom-0 left-0 right-0 bg-neutral-white border-t border-neutral-200"
        style={{ zIndex: BOTTOM_BAR_Z }}
      >
        <Box padding={16}>
          <Button
            variant="primary"
            size="lg"
            disabled={!canSubmit}
            onClick={handleNext}
            className="w-full"
          >
            다음
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
