import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CarTitle,
  Icon,
  NoImage,
  Stack,
  StepIndicator,
  TopAppBar,
  modal,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { getInstallStepCounts } from '../features/install/steps';
import type { Job, ReferenceImages as RefImagesType } from '../features/jobs/types';

const BOTTOM_BAR_Z = 50;
const MAX_IMAGE_HEIGHT = 240;

type ScreenKind = 'special' | 'manual' | 'component' | 'connector';

interface RefScreen {
  kind: ScreenKind;
  title: string;
  src?: string;
  fallbackLabel: string;
  specialIndex?: number;
  specialTotal?: number;
}

const FALLBACK_LABELS: Record<ScreenKind, string> = {
  special:
    '해당 차량에 대한 특이사항 이미지가 등록되지 않았습니다. 운영팀에 문의해 주세요.',
  manual:
    '해당 차량에 대한 설치 매뉴얼 이미지가 등록되지 않았습니다. 운영팀에 문의해 주세요.',
  component:
    '해당 차량에 대한 컴포넌트 이미지가 등록되지 않았습니다. 운영팀에 문의해 주세요.',
  connector:
    '해당 차량의 시동잠금 관련 설치 안내 이미지가 등록되지 않았습니다. 운영팀에 문의해 주세요.',
};

function buildScreens(refs?: RefImagesType): RefScreen[] {
  const screens: RefScreen[] = [];
  const specials = refs?.special ?? [];

  if (specials.length === 0) {
    screens.push({
      kind: 'special',
      title: '특이사항',
      fallbackLabel: FALLBACK_LABELS.special,
    });
  } else {
    const total = specials.length;
    specials.forEach((src, i) => {
      screens.push({
        kind: 'special',
        title: `특이사항(${i + 1})`,
        src,
        fallbackLabel: FALLBACK_LABELS.special,
        specialIndex: i + 1,
        specialTotal: total,
      });
    });
  }

  screens.push({
    kind: 'manual',
    title: '설치 매뉴얼',
    src: refs?.manual,
    fallbackLabel: FALLBACK_LABELS.manual,
  });
  screens.push({
    kind: 'component',
    title: '컴포넌트',
    src: refs?.component,
    fallbackLabel: FALLBACK_LABELS.component,
  });
  screens.push({
    kind: 'connector',
    title: '커넥터',
    src: refs?.connector,
    fallbackLabel: FALLBACK_LABELS.connector,
  });

  return screens;
}

function ImageBoxWithZoom({ title, src }: { title: string; src: string }) {
  const handleZoom = () => {
    void modal.alert({
      title,
      content: (
        <Box className="overflow-clip rounded-lg-12">
          <Box
            as="img"
            className="block w-full h-auto"
            {...{ src, alt: title }}
          />
        </Box>
      ),
      confirmLabel: '닫기',
    });
  };

  return (
    <Box className="relative cursor-pointer" onClick={handleZoom}>
      <Box
        as="img"
        maxHeight={MAX_IMAGE_HEIGHT}
        className="block w-full h-auto rounded-lg-12 border border-neutral-200 object-cover"
        {...{ src, alt: title }}
      />
      <Box
        className="absolute top-8 right-8 inline-flex items-center justify-center rounded-md-8 bg-neutral-white"
        padding={4}
      >
        <Icon name="search" size={24} />
      </Box>
    </Box>
  );
}

export default function ReferenceImagesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const screens = useMemo(() => buildScreens(job?.referenceImages), [job]);
  const [index, setIndex] = useState(0);

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="참조이미지" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const screen = screens[index];
  const isFirst = index === 0;
  const isLast = index === screens.length - 1;

  const handlePrev = () => {
    if (isFirst) return;
    setIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (isLast) {
      navigate(`/jobs/${job.id}/evidence-photos`);
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar
        title="참조이미지"
        onBack={() => navigate(`/jobs/${job.id}/tasks`)}
      />

      <Box paddingX={16} paddingTop={16}>
        <StepIndicator {...getInstallStepCounts(job, 'reference-images', index)} />
      </Box>

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <CarTitle carModel={job.carModel} plateNumber={job.plateNumber} />

        <Stack direction="column" gap={8}>
          <Stack direction="row" align="center" justify="between" gap={8}>
            <Box as="h2" className="text-h3-20 font-bold text-neutral-black">
              {screen.title}
            </Box>
            {screen.specialTotal && screen.specialTotal > 1 && (
              <Box className="text-body-sm-16 font-regular text-neutral-500">
                {screen.specialIndex} / {screen.specialTotal}
              </Box>
            )}
          </Stack>
          {screen.src ? (
            <ImageBoxWithZoom title={screen.title} src={screen.src} />
          ) : (
            <NoImage label={screen.fallbackLabel} />
          )}
        </Stack>
      </Stack>

      <Box height={120} />

      <Box
        className="fixed bottom-0 left-0 right-0 bg-neutral-white border-t border-neutral-200"
        style={{ zIndex: BOTTOM_BAR_Z }}
      >
        <Stack direction="row" gap={8} padding={16}>
          <Button
            variant="outline"
            size="lg"
            disabled={isFirst}
            onClick={handlePrev}
            className="flex-1"
          >
            이전
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            다음
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
