import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  Info,
  PhotoCapture,
  Stack,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import type { Job } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;

export default function AsItemPhotoPage() {
  const { id, idx } = useParams<{ id: string; idx: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const itemIndex = Number(idx);
  const itemLabel = job?.asItems?.[itemIndex];

  const [photo, setPhoto] = useState<string | undefined>(undefined);

  if (!job || !itemLabel) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="AS 항목" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          AS 항목 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const togglePhoto = () => {
    setPhoto((prev) =>
      prev ? undefined : `https://picsum.photos/seed/as-${job.id}-${idx}/200/200`,
    );
  };

  const handleComplete = () => {
    if (!photo) return;
    sessionStorage.setItem(`as-completed-${job.id}-${itemIndex}`, 'true');
    navigate(`/jobs/${job.id}/tasks`);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title={itemLabel}
        onBack={() => navigate(`/jobs/${job.id}/tasks`)}
      />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Info icon="info" title="작업 완료 이미지 첨부" className="bg-neutral-white">
          {itemLabel} 작업 완료 후 작업 결과를 보여주는 사진 1장을 촬영해 주세요.
        </Info>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            증빙 사진 <span className="text-danger">*</span>
          </Box>
          <Box width="50%">
            <PhotoCapture
              full
              label="작업 완료 이미지"
              src={photo}
              onCapture={togglePhoto}
            />
          </Box>
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
            disabled={!photo}
            onClick={handleComplete}
            className="w-full"
          >
            작업 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
