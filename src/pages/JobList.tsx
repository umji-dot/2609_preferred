import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Icon,
  JobCard,
  Search,
  Stack,
  TabBar,
  TabBarItem,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import type { Job, ServiceType } from '../features/jobs/types';

const SERVICE_BADGE_VARIANT: Record<ServiceType, 'install' | 'service' | 'removal'> = {
  설치: 'install',
  AS: 'service',
  탈거: 'removal',
};

export default function JobListPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const k = keyword.trim();
    if (!k) return MOCK_JOBS;
    return MOCK_JOBS.filter(
      (j) =>
        j.plateNumber.includes(k) ||
        j.company.includes(k) ||
        j.branch.includes(k),
    );
  }, [keyword]);

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="배정 작업 목록" />

      <Box paddingX={16} paddingTop={16} paddingBottom={12}>
        <Search
          placeholder="차량번호·업체명·지점명으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onClear={() => setKeyword('')}
        />
      </Box>

      <Stack
        direction="column"
        gap={12}
        paddingX={16}
        paddingTop={4}
      >
        {filtered.length === 0 ? (
          <Box
            paddingY={48}
            className="text-center text-body-sm-16 font-regular text-neutral-500"
          >
            검색 결과가 없습니다.
          </Box>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              plateNumber={job.plateNumber}
              carModel={job.carModel}
              branch={`${job.company} ${job.branch}`}
              date={job.requestDate}
              address={job.address}
              phone={job.phone}
              badges={<JobBadges job={job} />}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="cursor-pointer"
            />
          ))
        )}
      </Stack>

      <Box height={120} />

      <TabBar>
        <TabBarItem
          active
          icon={<Icon name="assignment" size={24} filled />}
          onClick={() => navigate('/jobs')}
        >
          배정 작업 목록
        </TabBarItem>
        <TabBarItem
          icon={<Icon name="history" size={24} />}
          onClick={() => navigate('/history')}
        >
          이력
        </TabBarItem>
      </TabBar>
    </Box>
  );
}

function JobBadges({ job }: { job: Job }) {
  return (
    <>
      {job.isTemp && <Badge variant="temp">임시</Badge>}
      <Badge variant={SERVICE_BADGE_VARIANT[job.serviceType]}>
        {job.serviceType}
      </Badge>
      <Badge variant="default">{job.installType}</Badge>
    </>
  );
}
