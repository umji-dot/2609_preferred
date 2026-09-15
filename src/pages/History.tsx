import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Icon,
  JobCard,
  Search,
  Select,
  Stack,
  TabBar,
  TabBarItem,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_HISTORY } from '../features/history/mocks';
import type { HistoryJob } from '../features/history/types';
import type { ServiceType } from '../features/jobs/types';

const SERVICE_BADGE_VARIANT: Record<ServiceType, 'install' | 'service' | 'removal'> = {
  설치: 'install',
  AS: 'service',
  탈거: 'removal',
};

const ALL = 'all';
const YEAR_OPTIONS = [
  { value: ALL, label: '전체 연도' },
  { value: '2026', label: '2026년' },
  { value: '2025', label: '2025년' },
  { value: '2024', label: '2024년' },
];

const MONTH_OPTIONS = [
  { value: ALL, label: '전체 월' },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}월`,
  })),
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [year, setYear] = useState<string>(ALL);
  const [month, setMonth] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const k = keyword.trim();
    return MOCK_HISTORY.filter((h) => {
      const [y, m] = h.completedAt.split(' ')[0].split('-');
      if (year !== ALL && y !== year) return false;
      if (month !== ALL && String(parseInt(m, 10)) !== month) return false;
      if (k && !(h.plateNumber.includes(k) || h.company.includes(k) || h.branch.includes(k))) {
        return false;
      }
      return true;
    });
  }, [keyword, year, month]);

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title="이력" />

      <Stack direction="column" gap={12} paddingX={16} paddingTop={16}>
        <Search
          placeholder="차량번호·업체명·지점명으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onClear={() => setKeyword('')}
        />

        <Stack direction="row" gap={8}>
          <Box grow>
            <Select
              options={YEAR_OPTIONS}
              value={year}
              onChange={setYear}
              placeholder="연도"
            />
          </Box>
          <Box grow>
            <Select
              options={MONTH_OPTIONS}
              value={month}
              onChange={setMonth}
              placeholder="월"
            />
          </Box>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        gap={12}
        paddingX={16}
        paddingTop={16}
      >
        {filtered.length === 0 ? (
          <Box
            paddingY={48}
            className="text-center text-body-sm-16 font-regular text-neutral-500"
          >
            해당 기간에 작업 이력이 없습니다.
          </Box>
        ) : (
          filtered.map((h) => {
            const isOperated = h.completionStatus === 'completed' && h.byOps;
            return (
              <JobCard
                key={h.id}
                plateNumber={h.plateNumber}
                carModel={h.carModel}
                branch={`${h.company} ${h.branch}`}
                badges={<HistoryBadges item={h} />}
                completion={{
                  date: h.completedAt,
                  status: (isOperated ? 'operated' : h.completionStatus) as 'completed' | 'failed',
                  datePrefix: h.completionStatus === 'failed' ? '작업 불가일' : '작업 완료일',
                }}
                onClick={() => navigate(`/history/${h.id}`)}
                className="cursor-pointer"
              />
            );
          })
        )}
      </Stack>

      <Box height={120} />

      <TabBar>
        <TabBarItem
          icon={<Icon name="assignment" size={24} />}
          onClick={() => navigate('/jobs')}
        >
          배정 작업 목록
        </TabBarItem>
        <TabBarItem
          active
          icon={<Icon name="history" size={24} filled />}
          onClick={() => navigate('/history')}
        >
          이력
        </TabBarItem>
      </TabBar>
    </Box>
  );
}

function HistoryBadges({ item }: { item: HistoryJob }) {
  return (
    <>
      <Badge variant={SERVICE_BADGE_VARIANT[item.serviceType]}>
        {item.serviceType}
      </Badge>
      <Badge variant="default">{item.installType}</Badge>
    </>
  );
}
