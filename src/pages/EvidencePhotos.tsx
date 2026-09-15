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
  StepIndicator,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import {
  EVIDENCE_PHOTO_ITEMS,
  INITIAL_CAPTURED_PHOTOS,
} from '../features/evidence/mocks';
import { getInstallStepCounts } from '../features/install/steps';
import type { Job } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;

export default function EvidencePhotosPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const [photos, setPhotos] = useState<Record<string, string | undefined>>(
    () => ({ ...INITIAL_CAPTURED_PHOTOS }),
  );

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="증빙사진 첨부" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const isNonObd = job.installType === 'Non-OBD';

  const items = EVIDENCE_PHOTO_ITEMS.map((item) => ({
    ...item,
    isRequired: item.required || (isNonObd && !!item.requiredForNonObd),
  }));

  const requiredItems = items.filter((i) => i.isRequired);
  const optionalItems = items.filter((i) => !i.isRequired);

  const allRequiredCaptured = requiredItems.every((i) => photos[i.id]);

  const togglePhoto = (itemId: string) => {
    setPhotos((prev) => ({
      ...prev,
      [itemId]: prev[itemId]
        ? undefined
        : `https://picsum.photos/seed/ev-${itemId}/200/200`,
    }));
  };

  const handleComplete = () => {
    if (!allRequiredCaptured) return;
    const asContextStr = sessionStorage.getItem(`as-context-${job.id}`);
    if (asContextStr) {
      try {
        const { idx } = JSON.parse(asContextStr) as { idx: number };
        sessionStorage.setItem(`as-completed-${job.id}-${idx}`, 'true');
        sessionStorage.removeItem(`as-context-${job.id}`);
      } catch {
        sessionStorage.removeItem(`as-context-${job.id}`);
      }
    } else {
      sessionStorage.setItem(`install-completed-${job.id}`, 'true');
    }
    navigate(`/jobs/${job.id}/tasks`);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title="증빙사진 첨부"
        onBack={() => navigate(`/jobs/${job.id}/tasks`)}
      />

      <Box paddingX={16} paddingTop={16}>
        <StepIndicator {...getInstallStepCounts(job, 'evidence-photos')} />
      </Box>

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Info
          icon="photo_camera"
          title="최초 촬영 모드"
          className="bg-neutral-white"
        >
          각 항목의 [촬영] 버튼을 눌러 현장에서 직접 촬영해 주세요. (갤러리 첨부 불가)
        </Info>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            필수 ({requiredItems.length}장)
          </Box>
          <Grid columns={2} gap={8}>
            {requiredItems.map((item) => (
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

        {optionalItems.length > 0 && (
          <Stack direction="column" gap={8} marginTop={8}>
            <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
              선택 ({optionalItems.length}장)
            </Box>
            <Grid columns={2} gap={8}>
              {optionalItems.map((item) => (
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
        )}
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
            disabled={!allRequiredCaptured}
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
