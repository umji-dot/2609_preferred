export type ServiceType = '설치' | 'AS' | '탈거';
export type InstallType = 'OBD' | 'Non-OBD';

export interface ReferenceImages {
  special?: string[];
  manual?: string;
  component?: string;
  connector?: string;
}

export type VerifyResultStatus = 'normal' | 'abnormal';

export interface VerifyResultData {
  deviceModel: string;
  deviceSn: string;
  digitalKey: boolean;
  ignitionLock: boolean;
  gpsCoords: string;
  mileage: number;
  fuelLevel: number;
  powerResult: VerifyResultStatus;
  ignitionResult: VerifyResultStatus;
  ignitionLockResult?: VerifyResultStatus;
  gpsResult: VerifyResultStatus;
  retryCount?: number;
}

export interface Job {
  id: string;
  plateNumber: string;
  carModel: string;
  company: string;
  branch: string;
  serviceType: ServiceType;
  installType: InstallType;
  address: string;
  phone: string;
  requestDate: string;
  isTemp?: boolean;
  memo?: string;
  asItems?: string[];
  digitalKey?: boolean;
  ignitionLock?: boolean;
  referenceImages?: ReferenceImages;
  verifyResult?: VerifyResultData;
}
