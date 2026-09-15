import type { Job } from '../jobs/types';

export type InstallPage =
  | 'select-device'
  | 'settings'
  | 'reference-images'
  | 'evidence-photos';

export function countReferenceScreens(job: Job | undefined): number {
  const specials = job?.referenceImages?.special ?? [];
  const specialPages = specials.length === 0 ? 1 : specials.length;
  return specialPages + 3;
}

export function getInstallStepCounts(
  job: Job | undefined,
  page: InstallPage,
  refIndex = 0,
): { total: number; current: number } {
  const refPages = countReferenceScreens(job);
  const total = 2 + refPages + 1;
  let current = 1;
  switch (page) {
    case 'select-device':
      current = 1;
      break;
    case 'settings':
      current = 2;
      break;
    case 'reference-images':
      current = 3 + refIndex;
      break;
    case 'evidence-photos':
      current = total;
      break;
  }
  return { total, current };
}
