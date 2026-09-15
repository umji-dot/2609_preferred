import type { Job } from '../jobs/types';
import type { WorkTask } from './types';

export const INSTALL_TASK_TEMPLATE: ReadonlyArray<Omit<WorkTask, 'completed'>> = [
  { id: 'select-device', title: '단말기 모델 선택' },
  { id: 'settings', title: '설정 입력' },
  { id: 'reference-images', title: '참조 이미지 확인' },
  { id: 'evidence-photos', title: '증빙사진 첨부' },
];

export function getInitialTasks(job: Job): WorkTask[] {
  if (job.serviceType === 'AS') {
    return (job.asItems ?? []).map((title, idx) => ({
      id: `as-${idx}`,
      title,
      completed: false,
    }));
  }
  return INSTALL_TASK_TEMPLATE.map((t) => ({ ...t, completed: false }));
}
