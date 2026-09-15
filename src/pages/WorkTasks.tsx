import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  ListItem,
  Stack,
  TopAppBar,
} from 'installer-design-system';
import { MOCK_JOBS } from '../features/jobs/mocks';
import { getInitialTasks } from '../features/tasks/mocks';
import type { Job } from '../features/jobs/types';
import type { WorkTask } from '../features/tasks/types';

const BOTTOM_BAR_Z = 50;

export default function WorkTasksPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job = useMemo<Job | undefined>(
    () => MOCK_JOBS.find((j) => j.id === id),
    [id],
  );

  const isInstall = job?.serviceType === '설치';

  const initialTasks = useMemo<WorkTask[]>(() => {
    if (!job) return [];
    if (isInstall) {
      const completed =
        sessionStorage.getItem(`install-completed-${job.id}`) === 'true';
      return [{ id: 'install', title: '설치 작업', completed }];
    }
    if (job.serviceType === 'AS') {
      return (job.asItems ?? []).map((title, idx) => ({
        id: `as-${idx}`,
        title,
        completed:
          sessionStorage.getItem(`as-completed-${job.id}-${idx}`) === 'true',
      }));
    }
    return getInitialTasks(job);
  }, [job, isInstall]);

  const [tasks] = useState<WorkTask[]>(initialTasks);

  if (!job) {
    return (
      <Box className="min-h-screen bg-neutral-100">
        <TopAppBar title="작업" onBack={() => navigate('/jobs')} />
        <Box paddingY={64} className="text-center text-body-sm-16 font-regular text-neutral-500">
          작업 정보를 찾을 수 없습니다.
        </Box>
      </Box>
    );
  }

  const pageTitle = `${job.serviceType} 작업`;
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);

  const handleItemClick = (task: WorkTask) => {
    if (isInstall) {
      navigate(`/jobs/${job.id}/select-device`);
      return;
    }
    if (job.serviceType === 'AS') {
      const idx = Number(task.id.replace('as-', ''));
      const title = task.title;
      const isDeviceReplace =
        title === '단말기 단순 교체' || title === '단말기 모델 교체';
      if (isDeviceReplace) {
        sessionStorage.setItem(
          `as-context-${job.id}`,
          JSON.stringify({ idx }),
        );
        navigate(`/jobs/${job.id}/select-device`);
      } else {
        navigate(`/jobs/${job.id}/as/${idx}`);
      }
    }
  };

  const handleVerify = () => {
    navigate(`/jobs/${job.id}/verify`);
  };

  return (
    <Box className="min-h-screen bg-neutral-100">
      <TopAppBar title={pageTitle} onBack={() => navigate(`/jobs/${job.id}`)} />

      <Stack direction="column" gap={16} paddingX={16} paddingTop={16}>
        <Stack direction="column" gap={4}>
          <Box as="h1" className="text-h1-24 font-bold text-neutral-black">
            {pageTitle} 목록
          </Box>
          <Box className="text-body-sm-16 font-regular text-neutral-500">
            항목을 눌러 작업을 진행하세요
          </Box>
        </Stack>

        <Stack direction="column" gap={8}>
          {tasks.length === 0 ? (
            <Box paddingY={32} className="text-center text-body-sm-16 font-regular text-neutral-500">
              진행할 작업이 없습니다.
            </Box>
          ) : (
            tasks.map((task) => (
              <ListItem
                key={task.id}
                title={task.title}
                completed={task.completed}
                onClick={() => handleItemClick(task)}
                className="cursor-pointer"
              />
            ))
          )}
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
            disabled={!allCompleted}
            onClick={handleVerify}
            className="w-full"
          >
            검증하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
