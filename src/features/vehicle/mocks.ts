/**
 * 차량 관리 목록 — 퍼블리싱용 더미 데이터.
 * 프로토타입 v2.0(260716) 차량관리 테이블 예시 3행 + 20개 기본 노출을 위한 확장 17행.
 * PRD v2.8 §4.2.1 컬럼 순서 (23 컬럼).
 */

export type VerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'NONE';
export type VehicleStatus = '운영' | '매각';
export type CommMode = 'OBD' | 'NonOBD';

export interface VehicleRow {
  id: string;
  imageEmoji: string;
  reseller: string;
  company: string;
  branch: string;
  vin: string;
  plateNo: string;
  modelYear: number;
  manufacturer: string;
  model: string;
  subModel: string;
  deviceType: string;
  deviceSN: string;
  fuel: string;
  mileage: string;
  commMode: CommMode;
  firstInstall: string;
  lastInstall: string;
  removedAt: string | null;
  carCode: string | null;
  registration: VerificationStatus;
  status: VehicleStatus;
}

const car = (over: Partial<VehicleRow>): VehicleRow => ({
  id: '',
  imageEmoji: '🚗',
  reseller: '리셀러A',
  company: 'IMS모빌리티',
  branch: '서울지점',
  vin: '',
  plateNo: '',
  modelYear: 2024,
  manufacturer: '현대',
  model: '아이오닉 6',
  subModel: '스탠다드 롱레인지',
  deviceType: 'FMS-T100',
  deviceSN: '',
  fuel: '전기',
  mileage: '0km',
  commMode: 'OBD',
  firstInstall: '2024-03-20',
  lastInstall: '2024-03-20',
  removedAt: null,
  carCode: null,
  registration: 'NONE',
  status: '운영',
  ...over,
});

export const VEHICLE_ROWS: VehicleRow[] = [
  car({ id: '5001', imageEmoji: '🚗', vin: 'KMHGN41GP8A123456', plateNo: '123가4567', mileage: '12,450km', deviceSN: 'SN-20240001', carCode: 'HY-IONIQ6-2024', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5002', imageEmoji: '🚙', reseller: '리셀러B', branch: '부산지점', vin: 'KMHC241BBPA456789', plateNo: '456나7890', modelYear: 2023, model: '팰리세이드', subModel: '디젤 캘리그래피', deviceType: 'FMS-T200', deviceSN: 'SN-20230045', fuel: '경유', mileage: '45,200km', firstInstall: '2023-06-15', lastInstall: '2024-01-10', removedAt: '2024-11-20', carCode: null, registration: 'UNVERIFIED', status: '매각' }),
  car({ id: '5003', imageEmoji: '🚘', company: 'ABC렌터카', branch: '인천지점', vin: 'WBA5X9C03LAB78901', plateNo: '789다0123', modelYear: 2023, manufacturer: 'BMW', model: '5시리즈', subModel: '520d xDrive', deviceSN: 'SN-20240088', fuel: '경유', mileage: '8,910km', commMode: 'NonOBD', firstInstall: '2024-02-05', lastInstall: '2024-02-05', carCode: 'BMW-5SER-2023', registration: 'NONE', status: '운영' }),
  car({ id: '5004', imageEmoji: '🚗', reseller: '리셀러A', company: 'IMS모빌리티', branch: '서울지점', vin: 'KMHL341CBNA234567', plateNo: '234가5678', modelYear: 2022, model: '쏘나타', subModel: '2.0 스마트', deviceType: 'FMS-T100', deviceSN: 'SN-20220123', fuel: '휘발유', mileage: '32,100km', firstInstall: '2022-08-01', lastInstall: '2022-08-01', carCode: 'HY-SONATA-2022', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5005', imageEmoji: '🚙', reseller: '리셀러B', company: '카카오모빌리티', branch: '대구지점', vin: 'KMHR381GPKB567123', plateNo: '567라8901', modelYear: 2022, model: '그랜저', subModel: '하이브리드 프리미엄', deviceType: 'FMS-T200', deviceSN: 'SN-20220456', fuel: '하이브리드(휘발유+전기)', mileage: '58,300km', commMode: 'OBD', firstInstall: '2022-11-15', lastInstall: '2023-05-10', carCode: 'HY-GRAN-2022', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5006', imageEmoji: '🚘', reseller: '리셀러A', company: 'ABC렌터카', branch: '광주지점', vin: 'KNAJC512BFA890234', plateNo: '890마1234', modelYear: 2023, manufacturer: '기아', model: '카니발', subModel: '9인승 노블레스', deviceType: 'FMS-T100', deviceSN: 'SN-20230789', fuel: '경유', mileage: '22,700km', firstInstall: '2023-04-20', lastInstall: '2023-04-20', carCode: 'KIA-CARNI-2023', registration: 'UNVERIFIED', status: '운영' }),
  car({ id: '5007', imageEmoji: '🚗', reseller: '리셀러A', company: 'IMS모빌리티', branch: '서울지점', vin: 'KMHGN12KEHA345678', plateNo: '345바6789', modelYear: 2024, manufacturer: '제네시스', model: 'G80', subModel: '2.5T AWD', deviceType: 'FMS-T100', deviceSN: 'SN-20240300', fuel: '휘발유', mileage: '5,400km', firstInstall: '2024-06-01', lastInstall: '2024-06-01', carCode: 'GEN-G80-2024', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5008', imageEmoji: '🚗', reseller: '리셀러B', company: '카카오모빌리티', branch: '수원지점', vin: 'KNDCT3LG5N7401234', plateNo: '401사2345', modelYear: 2024, manufacturer: '기아', model: 'EV6', subModel: 'GT-Line', deviceType: 'FMS-T200', deviceSN: 'SN-20240211', fuel: '전기', mileage: '3,800km', commMode: 'OBD', firstInstall: '2024-07-15', lastInstall: '2024-07-15', carCode: 'KIA-EV6-2024', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5009', imageEmoji: '🚘', reseller: '리셀러A', company: '삼성전자모빌리티', branch: '서울지점', vin: 'WDD2130361A012345', plateNo: '012아3456', modelYear: 2023, manufacturer: '벤츠', model: 'E-Class', subModel: 'E 300 4MATIC', deviceType: 'FMS-T100', deviceSN: 'SN-20230550', fuel: '휘발유', mileage: '18,600km', firstInstall: '2023-09-05', lastInstall: '2024-04-01', carCode: 'BENZ-E300-2023', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5010', imageEmoji: '🚗', reseller: '리셀러B', company: 'ABC렌터카', branch: '부산지점', vin: 'WAUZZZF4XPA234567', plateNo: '234자5678', modelYear: 2023, manufacturer: '아우디', model: 'A6', subModel: '45 TFSI Premium', deviceType: 'FMS-T200', deviceSN: 'SN-20230812', fuel: '휘발유', mileage: '9,150km', commMode: 'NonOBD', firstInstall: '2023-12-20', lastInstall: '2023-12-20', carCode: 'AUDI-A6-2023', registration: 'NONE', status: '운영' }),
  car({ id: '5011', imageEmoji: '🚙', reseller: '리셀러A', company: 'IMS모빌리티', branch: '대전지점', vin: 'KMHK281AGNA678901', plateNo: '678차0123', modelYear: 2022, model: '코나', subModel: '1.6 하이브리드', deviceType: 'FMS-T100', deviceSN: 'SN-20220999', fuel: '하이브리드(휘발유+전기)', mileage: '41,300km', firstInstall: '2022-05-10', lastInstall: '2023-10-15', carCode: 'HY-KONA-2022', registration: 'UNVERIFIED', status: '매각' }),
  car({ id: '5012', imageEmoji: '🚗', reseller: '리셀러B', company: '카카오모빌리티', branch: '광주지점', vin: 'KNAG2411HN5432109', plateNo: '432카1098', modelYear: 2022, manufacturer: '기아', model: 'K5', subModel: '2.0 LPI', deviceType: 'FMS-T200', deviceSN: 'SN-20220333', fuel: 'LPG', mileage: '55,700km', firstInstall: '2022-03-30', lastInstall: '2022-03-30', carCode: 'KIA-K5-2022', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5013', imageEmoji: '🚐', reseller: '리셀러A', company: 'IMS모빌리티', branch: '서울지점', vin: 'KMHUB81CPPA789012', plateNo: '789타2345', modelYear: 2023, model: '스타리아', subModel: '11인승 라운지', deviceType: 'FMS-T100', deviceSN: 'SN-20231010', fuel: '경유', mileage: '28,900km', firstInstall: '2023-07-01', lastInstall: '2023-07-01', carCode: 'HY-STARIA-2023', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5014', imageEmoji: '🚙', reseller: '리셀러B', company: 'ABC렌터카', branch: '서울지점', vin: '5UXCR6C09N0A12345', plateNo: '012파3456', modelYear: 2024, manufacturer: 'BMW', model: 'X5', subModel: 'xDrive40i', deviceType: 'FMS-T200', deviceSN: 'SN-20240612', fuel: '휘발유', mileage: '2,100km', firstInstall: '2024-09-10', lastInstall: '2024-09-10', carCode: 'BMW-X5-2024', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5015', imageEmoji: '🚘', reseller: '리셀러A', company: '삼성전자모빌리티', branch: '수원지점', vin: 'KMHG341FBPB901234', plateNo: '901하0123', modelYear: 2023, manufacturer: '제네시스', model: 'GV70', subModel: '2.2 디젤', deviceType: 'FMS-T100', deviceSN: 'SN-20230777', fuel: '경유', mileage: '19,400km', firstInstall: '2023-05-25', lastInstall: '2024-02-10', carCode: 'GEN-GV70-2023', registration: 'UNVERIFIED', status: '운영' }),
  car({ id: '5016', imageEmoji: '🚙', reseller: '리셀러B', company: 'IMS모빌리티', branch: '부산지점', vin: 'KNAPM81BBMS234567', plateNo: '234가1234', modelYear: 2022, manufacturer: '기아', model: '스포티지', subModel: '1.6 T-GDI 하이브리드', deviceType: 'FMS-T200', deviceSN: 'SN-20220228', fuel: '하이브리드(휘발유+전기)', mileage: '47,800km', firstInstall: '2022-01-15', lastInstall: '2023-08-20', carCode: 'KIA-SPT-2022', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5017', imageEmoji: '🚙', reseller: '리셀러A', company: '카카오모빌리티', branch: '대구지점', vin: 'KMHNB81ANNH567890', plateNo: '567나4567', modelYear: 2023, model: '투싼', subModel: '2.0 디젤', deviceType: 'FMS-T100', deviceSN: 'SN-20230119', fuel: '경유', mileage: '15,600km', firstInstall: '2023-11-05', lastInstall: '2023-11-05', carCode: 'HY-TUC-2023', registration: 'NONE', status: '운영' }),
  car({ id: '5018', imageEmoji: '🚘', reseller: '리셀러B', company: '삼성전자모빌리티', branch: '서울지점', vin: 'WDD2050381R890123', plateNo: '890다7890', modelYear: 2022, manufacturer: '벤츠', model: 'C-Class', subModel: 'C 220 d', deviceType: 'FMS-T200', deviceSN: 'SN-20220876', fuel: '경유', mileage: '38,900km', firstInstall: '2022-06-18', lastInstall: '2023-04-15', carCode: 'BENZ-C220-2022', registration: 'VERIFIED', status: '운영' }),
  car({ id: '5019', imageEmoji: '🚙', reseller: '리셀러A', company: 'ABC렌터카', branch: '인천지점', vin: 'WAUZZZFY6P2123456', plateNo: '123라0987', modelYear: 2024, manufacturer: '아우디', model: 'Q5', subModel: '45 TFSI quattro', deviceType: 'FMS-T100', deviceSN: 'SN-20240445', fuel: '휘발유', mileage: '4,200km', firstInstall: '2024-08-12', lastInstall: '2024-08-12', carCode: 'AUDI-Q5-2024', registration: 'NONE', status: '운영' }),
  car({ id: '5020', imageEmoji: '🚗', reseller: '리셀러B', company: 'IMS모빌리티', branch: '서울지점', vin: 'KMHT381CBSA345678', plateNo: '345마5678', modelYear: 2024, model: '아이오닉 5', subModel: '롱레인지 프레스티지', deviceType: 'FMS-T200', deviceSN: 'SN-20240101', fuel: '전기', mileage: '6,700km', firstInstall: '2024-10-01', lastInstall: '2024-10-01', carCode: 'HY-IONIQ5-2024', registration: 'VERIFIED', status: '운영' }),
];

export const VEHICLE_TOTAL_COUNT = 1284;

export const RESELLER_OPTIONS = [
  { value: '', label: '전체' },
  { value: '리셀러A', label: 'A' },
  { value: '리셀러B', label: 'B' },
];

export const COMPANY_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'IMS모빌리티', label: 'IMS모빌리티' },
  { value: 'ABC렌터카', label: 'ABC렌터카' },
  { value: '카카오모빌리티', label: '카카오모빌리티' },
  { value: '삼성전자모빌리티', label: '삼성전자모빌리티' },
];

export const BRANCH_OPTIONS = [
  { value: '', label: '전체' },
  { value: '서울지점', label: '서울' },
  { value: '부산지점', label: '부산' },
  { value: '인천지점', label: '인천' },
  { value: '대구지점', label: '대구' },
  { value: '광주지점', label: '광주' },
  { value: '대전지점', label: '대전' },
  { value: '수원지점', label: '수원' },
];

export const DEVICE_MOUNT_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'mounted', label: '장착' },
  { value: 'not-mounted', label: '미장착' },
];

export const CAR_CODE_YN_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'Y', label: '카코드 있음' },
  { value: 'N', label: '카코드 없음' },
];

export const REG_DOC_YN_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'Y', label: '등록증 있음' },
  { value: 'N', label: '등록증 없음' },
];

export const VEHICLE_STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: '운영', label: '운영' },
  { value: '매각', label: '매각' },
];
