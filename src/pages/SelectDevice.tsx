import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  ObdCard,
  Stack,
  StepIndicator,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { DEVICE_MODELS } from '../features/devices/mocks';
import { getInstallStepCounts } from '../features/install/steps';
import type { Job } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;
const RADIO_GROUP_NAME = 'device-model';

export default function SelectDevicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const [selected, setSelected] = useState<string>('');

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="단말기 모델 선택" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const handleNext = () => {
    if (!selected) return;
    navigate(`/jobs/${job.id}/settings`);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title="단말기 모델 선택"
        onBack={() => navigate(`/jobs/${job.id}/tasks`)}
      />

      <Box paddingX={16} paddingTop={16}>
        <StepIndicator {...getInstallStepCounts(job, 'select-device')} />
      </Box>

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            단말기 모델
          </Box>
          <Stack direction="column" gap={8}>
            {DEVICE_MODELS.map((d) => (
              <ObdCard
                key={d.id}
                name={RADIO_GROUP_NAME}
                value={d.id}
                checked={selected === d.id}
                onChange={() => setSelected(d.id)}
                title={d.name}
                description={d.description}
              />
            ))}
          </Stack>
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
            disabled={!selected}
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
