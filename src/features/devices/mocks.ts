import type { DeviceModel } from './types';

export const DEVICE_MODELS: DeviceModel[] = [
  { id: 'CAMD1000', name: 'CAMD1000', description: '1세대 기본 단말기' },
  { id: 'CAMD2000', name: 'CAMD2000', description: '2세대 표준 단말기' },
  { id: 'CAMD2500', name: 'CAMD2500', description: '일반 OBD 단말기' },
  { id: 'CAMD2500K', name: 'CAMD2500K', description: '시동잠금 지원' },
  { id: 'CAMD2500LD', name: 'CAMD2500LD', description: '디지털차키 지원' },
  { id: 'CAMD2500KD', name: 'CAMD2500KD', description: '시동잠금 + 디지털차키' },
  { id: 'CAMD3000BK', name: 'CAMD3000BK', description: '3세대 시동잠금' },
  { id: 'CAMD3000BL', name: 'CAMD3000BL', description: '3세대 LTE' },
  { id: 'CAMD3000BKC', name: 'CAMD3000BKC', description: '3세대 통합 기능' },
];
