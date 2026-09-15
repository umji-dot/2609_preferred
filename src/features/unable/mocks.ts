export interface UnableReasonOption {
  value: string;
  label: string;
}

export const UNABLE_REASONS: UnableReasonOption[] = [
  { value: 'no-show', label: '차량 부재 (노쇼)' },
  { value: 'no-key', label: '차량 키 부재' },
  { value: 'no-signal', label: '통신 불가 지역' },
  { value: 'other', label: '기타 현장 사유' },
];

export const MAX_UNABLE_PHOTOS = 5;
