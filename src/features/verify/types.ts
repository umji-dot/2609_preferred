export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
export type LockTestStatus = 'pending' | 'locking' | 'locked' | 'unlocking' | 'completed' | 'failed';

export interface VerifyStep {
  id: 'step1' | 'step2' | 'step3' | 'step4';
  stepLabel: string;
  actionTitle: string;
  guideText: string;
}

export const VERIFY_STEPS: VerifyStep[] = [
  {
    id: 'step1',
    stepLabel: 'Step 1',
    actionTitle: '통신모드 동기화 (OBD/Non-OBD)',
    guideText: '통신모드 동기화를 시작해 주세요. 준비 완료 후 [시작]을 눌러주세요.',
  },
  {
    id: 'step2',
    stepLabel: 'Step 2',
    actionTitle: '차량 DB 설치 (CarDB)',
    guideText:
      '차량 DB(CarDB) 설치를 시작해 주세요. OBD 포트 연결 상태 확인 후 [시작]을 눌러주세요.',
  },
  {
    id: 'step3',
    stepLabel: 'Step 3',
    actionTitle: '시동 OFF (Trip 패킷 수신)',
    guideText:
      '차량 시동을 꺼주세요. [시작] 버튼을 누르면 Trip 패킷 수신 대기를 시작합니다.',
  },
  {
    id: 'step4',
    stepLabel: 'Step 4',
    actionTitle: '시동 ON (Activation 패킷 수신)',
    guideText:
      '차량 시동을 켜주세요. [시작] 버튼을 누르면 Activation 패킷 수신 대기를 시작합니다.',
  },
];

export interface ErrorPopup {
  id: string;
  title: string;
  body: string;
  hasClose: boolean;
}

export const ERROR_POPUPS: ErrorPopup[] = [
  {
    id: 'EX-02',
    title: '통신모드 동기화 실패',
    body: '통신모드 동기화에 실패했습니다. 단말기 연결 상태를 확인하고 재시도해 주세요.',
    hasClose: true,
  },
  {
    id: 'EX-14',
    title: '차량 DB 설치 실패',
    body: '차량 DB(CarDB) 설치에 실패했습니다. OBD 포트 연결 상태를 확인해 주세요.',
    hasClose: true,
  },
  {
    id: 'EX-15',
    title: '차량 DB 검증 실패',
    body: '차량 DB 설치 결과가 정상이 아닙니다. 단말기 연결 상태를 재확인해 주세요.',
    hasClose: true,
  },
  {
    id: 'EX-T1',
    title: '시동 OFF가 감지되지 않습니다',
    body: 'Trip 패킷이 수신되지 않았습니다. 차량 시동이 완전히 꺼진 상태인지 확인하고 재시도해 주세요.',
    hasClose: true,
  },
  {
    id: 'EX-T2',
    title: '시동이 감지되지 않습니다',
    body: 'Activation 패킷이 수신되지 않았습니다. 차량 시동이 켜진 상태인지 확인하고 재시도해 주세요.',
    hasClose: true,
  },
  {
    id: 'EX-05',
    title: '시동잠금 테스트 실패',
    body: '시동잠금 제어에 실패했습니다.\n① 차량 시동이 완전히 꺼진 상태인지 확인\n② ACC 모드(반시동)가 아닌지 확인\n③ 시동 OFF 후 최소 5초가 경과했는지 확인\n\n반복 실패 시 뒤로 돌아가 작업 상세 화면의 [작업 불가]를 처리해 주세요.',
    hasClose: false,
  },
];
