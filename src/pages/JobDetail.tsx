import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  DetailList,
  DetailRow,
  Memo,
  Stack,
  TopAppBar,
  modal,
  toast,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { UnableForm } from '../features/unable/components/UnableForm';
import type { Job, ServiceType } from '../features/jobs/types';

const SERVICE_BADGE_VARIANT: Record<ServiceType, 'install' | 'service' | 'removal'> = {
  설치: 'install',
  AS: 'service',
  탈거: 'removal',
};

const BOTTOM_BAR_Z = 50;

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="작업 상세" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const handleStart = async () => {
    if (job.isTemp) {
      void modal.alert({
        title: '임시 등록 차량',
        subtitle:
          '해당 차량은 카코드 확인이 필요합니다.\n운영팀에 차대번호를 전달하고 문의해 주세요.\n\n운영팀이 정상 차량으로 교체 완료 후\n작업 목록을 새로고침하여 진행해 주세요.',
        confirmLabel: '확인',
      });
      return;
    }
    if (job.serviceType === '탈거') {
      const ok = await modal.confirm({
        title: '단말기 탈거 작업',
        subtitle:
          '본 차량의 단말기 탈거 작업을 진행하시겠습니까?\n탈거 후 증빙 사진 촬영이 필요합니다.',
        confirmLabel: '탈거 시작',
        cancelLabel: '취소',
      });
      if (!ok) return;
      navigate(`/jobs/${job.id}/removal`);
      return;
    }
    navigate(`/jobs/${job.id}/tasks`);
  };

  const handleUnable = async () => {
    const confirmed = await modal.confirm({
      title: '작업 불가 처리',
      content: (
        <Box maxHeight="70vh" className="overflow-y-auto">
          <UnableForm jobId={job.id} />
        </Box>
      ),
      confirmLabel: '작업 불가 처리',
      cancelLabel: '취소',
      tone: 'danger',
    });
    if (!confirmed) return;
    toast.success({
      title: '작업 불가 처리 완료',
      description: '작업 불가 사유와 증빙 사진이 등록되었습니다.',
      duration: 3000,
    });
    setTimeout(() => navigate('/jobs'), 2000);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="작업 상세" onBack={() => navigate('/jobs')} />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        {job.isTemp && (
          <Memo variant="wait" title="임시 등록 차량">
            카코드 확인이 필요한 차량입니다. 운영팀에 차대번호를 전달하고 문의해 주세요.
          </Memo>
        )}

        {job.memo && <Memo title="운영팀 메모">{job.memo}</Memo>}

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            차량정보
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="차량번호" className="max-h-24">{job.plateNumber}</DetailRow>
            <DetailRow label="차종" className="max-h-24">{job.carModel}</DetailRow>
            <DetailRow label="업체명" className="max-h-24">{job.company}</DetailRow>
            <DetailRow label="지점명" className="max-h-24">{job.branch}</DetailRow>
            <DetailRow label="서비스 유형">
              <Badge variant={SERVICE_BADGE_VARIANT[job.serviceType]}>
                {job.serviceType}
              </Badge>
            </DetailRow>
            <DetailRow label="설치형태">
              <Badge variant="default">{job.installType}</Badge>
            </DetailRow>
            <DetailRow label="작업 요청일" className="max-h-24">{job.requestDate}</DetailRow>
          </DetailList>
        </Stack>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            현장 정보
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="작업 주소" className="max-h-24">{job.address}</DetailRow>
            <DetailRow label="업체 담당자 연락처" className="max-h-24">
              <Box as="a" className="text-primary underline" {...{ href: `tel:${job.phone}` }}>
                {job.phone}
              </Box>
            </DetailRow>
          </DetailList>
        </Stack>

        {job.serviceType === 'AS' && job.asItems && job.asItems.length > 0 && (
          <Stack direction="column" gap={8}>
            <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
              AS 요청사항
            </Box>
            <DetailList variant="single">
              {job.asItems.map((item, idx) => (
                <DetailRow key={idx} className="max-h-24">{item}</DetailRow>
              ))}
            </DetailList>
          </Stack>
        )}
      </Stack>

      <Box height={120} />

      <Box
        className="fixed bottom-0 left-0 right-0 bg-neutral-white border-t border-neutral-200"
        style={{ zIndex: BOTTOM_BAR_Z }}
      >
        <Stack direction="row" gap={8} padding={16}>
          <Button
            variant="danger"
            size="lg"
            onClick={handleUnable}
            className="flex-1"
          >
            작업 불가
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleStart}
            className="flex-1"
          >
            작업 시작
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
