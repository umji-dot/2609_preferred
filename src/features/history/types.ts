import type { ServiceType, InstallType } from '../jobs/types';

export type CompletionStatus = 'completed' | 'failed';
export type VerifyResult = 'normal' | 'abnormal' | 'shadow';

export interface HistoryPhotoItem {
  label: string;
  src: string;
}

export interface HistoryJob {
  id: string;
  plateNumber: string;
  carModel: string;
  company: string;
  branch: string;
  serviceType: ServiceType;
  installType: InstallType;
  completedAt: string;
  completionStatus: CompletionStatus;
  byOps?: boolean;

  deviceModel?: string;
  deviceSn?: string;
  digitalKey?: boolean;
  ignitionLock?: boolean;
  gpsCoords?: string;
  mileage?: number;
  fuelLevel?: number;
  powerResult?: VerifyResult;
  ignitionResult?: VerifyResult;
  ignitionLockResult?: VerifyResult;
  gpsResult?: VerifyResult;

  photos?: HistoryPhotoItem[];

  unableReason?: string;
  unableDetail?: string;
  unablePhotos?: HistoryPhotoItem[];
}
