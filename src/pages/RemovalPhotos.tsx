import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  Grid,
  Info,
  PhotoCapture,
  Stack,
  TopAppBar,
  toast,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import type { Job } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;

interface RemovalItem {
  id: string;
  label: string;
  always: boolean;
  digitalKeyOnly?: boolean;
}

const REMOVAL_ITEMS: RemovalItem[] = [
  { id: 'device', label: '단말기 탈거 사진', always: true },
  { id: 'work-complete', label: '작업 완료 이미지', always: false, digitalKeyOnly: true },
  { id: 'restore-video', label: '디지털차키 원복 동영상', always: false, digitalKeyOnly: true },
];

export default function RemovalPhotosPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const [photos, setPhotos] = useState<Record<string, string | undefined>>({});

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="단말기 탈거" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const hasDigitalKey = !!job.digitalKey;
  const items = REMOVAL_ITEMS.filter(
    (it) => it.always || (it.digitalKeyOnly && hasDigitalKey),
  );

  const allCaptured = items.every((it) => photos[it.id]);

  const togglePhoto = (itemId: string) => {
    setPhotos((prev) => ({
      ...prev,
      [itemId]: prev[itemId]
        ? undefined
        : `https://picsum.photos/seed/removal-${itemId}/200/200`,
    }));
  };

  const handleComplete = () => {
    if (!allCaptured) return;
    toast.success({
      title: '탈거 작업 완료',
      description: '단말기 탈거 작업이 완료 처리되었습니다.',
      duration: 3000,
    });
    setTimeout(() => navigate('/jobs'), 2000);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title="단말기 탈거"
        onBack={() => navigate(`/jobs/${job.id}`)}
      />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Info icon="info" title="단말기 탈거 작업" className="bg-neutral-white">
          단말기 탈거가 완료되면 아래 항목을 모두 촬영해 주세요.
          {hasDigitalKey
            ? ' 디지털차키 설치 차량이므로 작업 완료 이미지와 원복 동영상도 함께 첨부해야 합니다.'
            : ''}
        </Info>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            증빙 항목 ({items.length}장)
          </Box>
          <Grid columns={2} gap={8}>
            {items.map((item) => (
              <PhotoCapture
                key={item.id}
                full
                label={item.label}
                src={photos[item.id]}
                onCapture={() => togglePhoto(item.id)}
              />
            ))}
          </Grid>
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
            disabled={!allCaptured}
            onClick={handleComplete}
            className="w-full"
          >
            탈거 완료 처리
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
