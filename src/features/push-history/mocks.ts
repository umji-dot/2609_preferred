/**
 * 푸시 알림 발송 이력 — 퍼블리싱용 더미 데이터.
 *
 * 기능정의서_STAFF FT-01 (SCR-01, 관심지역 알림 발송 타입 추가) + FT-02 (SCR-02,
 * 알림톡·SMS 발송 이력 탭) 근거. 예시 데이터는 prototype_STAFF.html 의 기존 인용 값
 * 및 자료(00_자료/알림톡 발송 내역 by 슈어엠.xlsx) 패턴을 따른다.
 */

/* ────────── SCR-01 · 푸시 발송 이력 ────────── */

export type PushType = '관심지역 알림' | '과속 주행' | '배터리 위험';

export interface PushHistoryRow {
  id: string;
  type: PushType;
  company: string;
  branch: string;
  plateNumber: string;
  model: string;
  title: string;
  content: string;
  sendCount: number;
  sentAt: string;
}

export const PUSH_HISTORY_ROWS: PushHistoryRow[] = [
  {
    id: 'PH-001',
    type: '관심지역 알림',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '34허9571',
    model: '쏘나타',
    title: '관심지역 진입',
    content: '(주)퍼스트렌트카 - 이천지점 34허9571 (쏘나타) - 인천항 인근 관심지역 진입',
    sendCount: 1,
    sentAt: '2026-09-09 14:22:10',
  },
  {
    id: 'PH-002',
    type: '관심지역 알림',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '34허9571',
    model: '쏘나타',
    title: '관심지역 이탈',
    content: '(주)퍼스트렌트카 - 이천지점 34허9571 (쏘나타) - 인천항 인근 관심지역 이탈',
    sendCount: 1,
    sentAt: '2026-09-09 14:41:02',
  },
  {
    id: 'PH-003',
    type: '관심지역 알림',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '146하9836',
    model: '그랜저',
    title: '관심지역 진입',
    content: '주식회사 우리렌트카 - 남양주지점 146하9836 (그랜저) - 김포공항 인근 관심지역 진입',
    sendCount: 1,
    sentAt: '2026-09-09 15:02:44',
  },
  {
    id: 'PH-004',
    type: '과속 주행',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '34허9571',
    model: '쏘나타',
    title: '과속 주행',
    content: '(주)퍼스트렌트카 - 이천지점 34허9571 (쏘나타) - 시속 137km',
    sendCount: 10,
    sentAt: '2026-09-09 14:44:35',
  },
  {
    id: 'PH-005',
    type: '배터리 위험',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '133하1002',
    model: '모닝',
    title: '배터리 위험',
    content: '(주)퍼스트렌트카 - 이천지점 133하1002 (모닝) - 배터리 전압 10.8V 이하',
    sendCount: 9,
    sentAt: '2026-09-09 13:37:44',
  },
  {
    id: 'PH-006',
    type: '과속 주행',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '146하9836',
    model: '그랜저',
    title: '과속 주행',
    content: '주식회사 우리렌트카 - 남양주지점 146하9836 (그랜저) - 시속 128km',
    sendCount: 4,
    sentAt: '2026-09-09 11:14:22',
  },
  {
    id: 'PH-007',
    type: '관심지역 알림',
    company: '(주)퍼스트렌트카',
    branch: '수원지점',
    plateNumber: '89버4522',
    model: '카니발',
    title: '관심지역 진입',
    content: '(주)퍼스트렌트카 - 수원지점 89버4522 (카니발) - 인천항 인근 관심지역 진입',
    sendCount: 1,
    sentAt: '2026-09-09 10:03:17',
  },
  {
    id: 'PH-008',
    type: '배터리 위험',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '218머3312',
    model: '아반떼',
    title: '배터리 위험',
    content: '주식회사 우리렌트카 - 남양주지점 218머3312 (아반떼) - 배터리 전압 10.5V 이하',
    sendCount: 6,
    sentAt: '2026-09-09 09:55:41',
  },
];

export const PUSH_HISTORY_TOTAL_COUNT = 156;

export const PUSH_TYPE_OPTIONS = [
  { value: '', label: '푸시 발송 타입 전체' },
  { value: '관심지역 알림', label: '관심지역 알림' },
  { value: '과속 주행', label: '과속 주행' },
  { value: '배터리 위험', label: '배터리 위험' },
];

export const COMPANY_OPTIONS = [
  { value: '', label: '업체 전체' },
  { value: '(주)퍼스트렌트카', label: '(주)퍼스트렌트카' },
  { value: '주식회사 우리렌트카', label: '주식회사 우리렌트카' },
];

export const BRANCH_OPTIONS = [
  { value: '', label: '지점 전체' },
  { value: '이천지점', label: '이천지점' },
  { value: '남양주지점', label: '남양주지점' },
  { value: '수원지점', label: '수원지점' },
];

/* ────────── SCR-02 · 알림톡 및 SMS 발송 이력 ────────── */

export type MessageChannel = '알림톡' | 'SMS(전환됨)';
export type MessageResult = '성공' | '실패';

export interface MessageHistoryRow {
  id: string;
  company: string;
  branch: string;
  plateNumber: string;
  model: string;
  content: string;
  channel: MessageChannel;
  result: MessageResult;
  failReason: string | null;
  sentAt: string;
}

export const MESSAGE_HISTORY_ROWS: MessageHistoryRow[] = [
  {
    id: 'MH-001',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '34허9571',
    model: '쏘나타',
    content: '[34허9571] [쏘나타] 관심지역 진입',
    channel: '알림톡',
    result: '성공',
    failReason: null,
    sentAt: '2026-09-09 14:22:15',
  },
  {
    id: 'MH-002',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '146하9836',
    model: '그랜저',
    content: '[146하9836] [그랜저] 관심지역 이탈',
    channel: '알림톡',
    result: '실패',
    failReason: 'K3020 · 알림톡 차단',
    sentAt: '2026-09-09 15:03:41',
  },
  {
    id: 'MH-003',
    company: '(주)퍼스트렌트카',
    branch: '수원지점',
    plateNumber: '89버4522',
    model: '카니발',
    content: '[89버4522] [카니발] 관심지역 진입',
    channel: 'SMS(전환됨)',
    result: '성공',
    failReason: null,
    sentAt: '2026-09-09 10:03:22',
  },
  {
    id: 'MH-004',
    company: '(주)퍼스트렌트카',
    branch: '이천지점',
    plateNumber: '34허9571',
    model: '쏘나타',
    content: '[34허9571] [쏘나타] 관심지역 이탈',
    channel: '알림톡',
    result: '성공',
    failReason: null,
    sentAt: '2026-09-09 14:41:08',
  },
  {
    id: 'MH-005',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '218머3312',
    model: '아반떼',
    content: '[218머3312] [아반떼] 관심지역 진입',
    channel: '알림톡',
    result: '실패',
    failReason: 'K3019 · 카카오 미사용자',
    sentAt: '2026-09-09 09:12:03',
  },
  {
    id: 'MH-006',
    company: '주식회사 우리렌트카',
    branch: '남양주지점',
    plateNumber: '218머3312',
    model: '아반떼',
    content: '[218머3312] [아반떼] 관심지역 진입',
    channel: 'SMS(전환됨)',
    result: '성공',
    failReason: null,
    sentAt: '2026-09-09 09:12:05',
  },
];

export const MESSAGE_HISTORY_TOTAL_COUNT = 82;

export const CHANNEL_OPTIONS = [
  { value: '', label: '채널 전체' },
  { value: '알림톡', label: '알림톡' },
  { value: 'SMS(전환됨)', label: 'SMS(전환됨)' },
];

export const RESULT_OPTIONS = [
  { value: '', label: '발송 결과 전체' },
  { value: '성공', label: '성공' },
  { value: '실패', label: '실패' },
];
