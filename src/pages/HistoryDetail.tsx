import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Badge,
  Box,
  DetailList,
  DetailRow,
  Grid,
  HistoryPhoto,
  Stack,
  StatusPill,
  TopAppBar,
  VerificationItem,
  modal,
} from 'installer-design-system';
import { MOCK_HISTORY } from '../features/history/mocks';
import type {
  HistoryJob,
  HistoryPhotoItem,
  VerifyResult,
} from '../features/history/types';
import type { ServiceType } from '../features/jobs/types';

const SERVICE_BADGE_VARIANT: Record<ServiceType, 'install' | 'service' | 'removal'> = {
  설치: 'install',
  AS: 'service',
  탈거: 'removal',
};

const RESULT_TO_STATUS: Record<VerifyResult, 'completed' | 'failed'> = {
  normal: 'completed',
  abnormal: 'failed',
  shadow: 'failed',
};

const RESULT_LABEL: Record<VerifyResult, string> = {
  normal: '정상',
  abnormal: '비정상',
  shadow: '비정상 (음영지역)',
};

export default function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = useMemo<HistoryJob | undefined>(
    () => MOCK_HISTORY.find((h) => h.id === id),
    [id],
  );

  if (!item) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="작업 결과 상세" onBack={() => navigate('/history')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 이력을 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const isFailed = item.completionStatus === 'failed';
  const isRemoval = item.serviceType === '탈거';
  const showVerification = !isFailed && !isRemoval;

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="작업 결과 상세" onBack={() => navigate('/history')} />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            차량정보
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="차량번호" className="max-h-24">{item.plateNumber}</DetailRow>
            <DetailRow label="차종" className="max-h-24">{item.carModel}</DetailRow>
            <DetailRow label="업체명" className="max-h-24">{item.company}</DetailRow>
            <DetailRow label="지점명" className="max-h-24">{item.branch}</DetailRow>
            <DetailRow label="서비스 유형">
              <Badge variant={SERVICE_BADGE_VARIANT[item.serviceType]}>
                {item.serviceType}
              </Badge>
            </DetailRow>
            <DetailRow label="설치형태">
              <Badge variant="default">{item.installType}</Badge>
            </DetailRow>
          </DetailList>
        </Stack>

        <Stack direction="column" gap={8}>
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            작업 정보
          </Box>
          <DetailList variant="pairs">
            <DetailRow label="작업 완료일시" className="max-h-24">
              {item.completedAt}
            </DetailRow>
            <DetailRow label="처리 결과">
              <StatusPill
                status={
                  item.completionStatus === 'failed'
                    ? 'failed'
                    : item.byOps
                      ? 'operated'
                      : 'completed'
                }
              >
                {item.completionStatus === 'failed' ? '작업 불가' : undefined}
              </StatusPill>
            </DetailRow>
          </DetailList>
        </Stack>

        {showVerification && (
          <>
            <Stack direction="column" gap={8}>
              <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
                검증 결과 정보
              </Box>
              <DetailList variant="pairs">
                <DetailRow label="단말기 기종" className="max-h-24">{item.deviceModel}</DetailRow>
                <DetailRow label="단말기 SN" className="max-h-24">{item.deviceSn}</DetailRow>
                <DetailRow label="디지털차키 설치 여부" className="max-h-24">
                  {item.digitalKey ? '설치' : '미설치'}
                </DetailRow>
                <DetailRow label="시동잠금 설치 여부" className="max-h-24">
                  {item.ignitionLock ? '설치' : '미설치'}
                </DetailRow>
                <DetailRow label="GPS 좌표" className="max-h-24">{item.gpsCoords}</DetailRow>
                <DetailRow label="총 주행거리" className="max-h-24">
                  {item.mileage?.toLocaleString()} km
                </DetailRow>
                <DetailRow label="연료잔량" className="max-h-24">
                  {item.fuelLevel}%
                </DetailRow>
              </DetailList>
            </Stack>

            <Stack direction="column" gap={8}>
              <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
                검증 결과
              </Box>
              <DetailList variant="single">
                {item.powerResult && (
                  <VerificationItem
                    title="단말기 전원연결 결과"
                    status={RESULT_TO_STATUS[item.powerResult]}
                    completedLabel={RESULT_LABEL[item.powerResult]}
                    failedLabel={RESULT_LABEL[item.powerResult]}
                  />
                )}
                {item.ignitionResult && (
                  <VerificationItem
                    title="시동감지 결과"
                    status={RESULT_TO_STATUS[item.ignitionResult]}
                    completedLabel={RESULT_LABEL[item.ignitionResult]}
                    failedLabel={RESULT_LABEL[item.ignitionResult]}
                  />
                )}
                {item.ignitionLockResult && (
                  <VerificationItem
                    title="시동잠금 제어 검증 결과"
                    status={RESULT_TO_STATUS[item.ignitionLockResult]}
                    completedLabel={RESULT_LABEL[item.ignitionLockResult]}
                    failedLabel={RESULT_LABEL[item.ignitionLockResult]}
                  />
                )}
                {item.gpsResult && (
                  <VerificationItem
                    title="GPS 감도 확인 결과"
                    status={RESULT_TO_STATUS[item.gpsResult]}
                    completedLabel={RESULT_LABEL[item.gpsResult]}
                    failedLabel={RESULT_LABEL[item.gpsResult]}
                  />
                )}
              </DetailList>
            </Stack>
          </>
        )}

        {isFailed && (
          <Stack direction="column" gap={8}>
            <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
              작업 불가 사유
            </Box>
            <DetailList variant="pairs">
              <DetailRow label="사유" className="max-h-24">{item.unableReason}</DetailRow>
              <DetailRow>
                <Box className="w-full text-left text-body-sm-16 font-regular text-neutral-black">
                  {item.unableDetail}
                </Box>
              </DetailRow>
            </DetailList>
          </Stack>
        )}

        {item.photos && item.photos.length > 0 && (
          <Stack direction="column" gap={8}>
            <Stack direction="row" justify="between" align="center">
              <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
                증빙사진
              </Box>
              <Box className="text-caption-15 font-bold text-neutral-500">
                각 항목 클릭시 수정 가능
              </Box>
            </Stack>
            <PhotoGrid photos={item.photos} />
          </Stack>
        )}

        {isFailed && item.unablePhotos && item.unablePhotos.length > 0 && (
          <Stack direction="column" gap={8}>
            <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
              작업 불가 증빙
            </Box>
            <PhotoGrid photos={item.unablePhotos} />
          </Stack>
        )}
      </Stack>

      <Box height={32} />
    </Box>
  );
}

function PhotoGrid({ photos }: { photos: HistoryPhotoItem[] }) {
  const handleRetake = (label: string) => {
    void modal.alert({
      title: '사진 교체',
      subtitle: `"${label}" 사진을 다시 촬영하거나\n갤러리에서 교체할 수 있습니다.`,
      confirmLabel: '확인',
    });
  };

  return (
    <Grid columns={3} gap={8}>
      {photos.map((p, idx) => (
        <HistoryPhoto
          key={idx}
          full
          src={p.src}
          label={p.label}
          onRetake={() => handleRetake(p.label)}
        />
      ))}
    </Grid>
  );
}
