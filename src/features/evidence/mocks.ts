import type { EvidencePhotoItem } from './types';

export const EVIDENCE_PHOTO_ITEMS: EvidencePhotoItem[] = [
  { id: 'plate', label: '차량 번호판', required: true },
  { id: 'vin', label: '차대번호', required: true },
  { id: 'main-wiring', label: '메인배선 연결', required: true },
  { id: 'device-fix', label: '단말기 고정', required: true },
  { id: 'gps-fix', label: 'GPS 고정', required: true },
  { id: 'ignition-cut', label: '시동차단 연결', required: true },
  { id: 'fuel-wiring', label: '연료배선 연결', required: false },
  { id: 'aux-power', label: '상시전원 연결', required: false, requiredForNonObd: true },
];

export const INITIAL_CAPTURED_PHOTOS: Record<string, string> = {};
