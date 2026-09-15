/**
 * 카코드 관리 목록 — 퍼블리싱용 더미 데이터.
 * 프로토타입 v2.0(260716) 카코드 관리 테이블 예시 6행 + 20개 기본 노출을 위한 확장 14행.
 * PRD v2.8 §4.1.1 컬럼 순서: 카코드·제조사·모델명·하위모델명·연식·유종·배기량·길이·리버스·버전·차량 수
 */

export interface CarCodeRow {
  id: string;
  code: string;
  manufacturer: string;
  model: string;
  subModel: string;
  modelYear: number;
  fuel: string;
  displacement: string;
  length: string;
  reverse: boolean;
  version: string | null;
  vehicleCount: number;
}

export const CAR_CODE_ROWS: CarCodeRow[] = [
  { id: 'HY-IONIQ6-2024', code: 'HY-IONIQ6-2024', manufacturer: '현대', model: '아이오닉 6', subModel: '스탠다드 롱레인지', modelYear: 2024, fuel: '전기', displacement: '—', length: '4,855', reverse: false, version: null, vehicleCount: 3 },
  { id: 'HY-PALI-2023', code: 'HY-PALI-2023', manufacturer: '현대', model: '팰리세이드', subModel: '디젤 캘리그래피', modelYear: 2023, fuel: '경유', displacement: '2,199cc', length: '4,995', reverse: true, version: 'v1.2.3', vehicleCount: 7 },
  { id: 'BMW-5SER-2023', code: 'BMW-5SER-2023', manufacturer: 'BMW', model: '5시리즈', subModel: '520d xDrive', modelYear: 2023, fuel: '경유', displacement: '1,995cc', length: '4,963', reverse: false, version: null, vehicleCount: 2 },
  { id: 'HY-SONATA-2022', code: 'HY-SONATA-2022', manufacturer: '현대', model: '쏘나타', subModel: '2.0 스마트', modelYear: 2022, fuel: '휘발유', displacement: '1,999cc', length: '4,900', reverse: true, version: 'v2.0.1', vehicleCount: 12 },
  { id: 'HY-GRAN-2022', code: 'HY-GRAN-2022', manufacturer: '현대', model: '그랜저', subModel: '하이브리드 프리미엄', modelYear: 2022, fuel: '하이브리드(휘발유+전기)', displacement: '2,497cc', length: '4,990', reverse: true, version: 'v1.5.0', vehicleCount: 5 },
  { id: 'KIA-CARNI-2023', code: 'KIA-CARNI-2023', manufacturer: '기아', model: '카니발', subModel: '9인승 노블레스', modelYear: 2023, fuel: '경유', displacement: '2,199cc', length: '5,155', reverse: false, version: null, vehicleCount: 4 },
  { id: 'GEN-G80-2024', code: 'GEN-G80-2024', manufacturer: '제네시스', model: 'G80', subModel: '2.5T AWD', modelYear: 2024, fuel: '휘발유', displacement: '2,497cc', length: '4,995', reverse: true, version: 'v1.0.0', vehicleCount: 6 },
  { id: 'KIA-EV6-2024', code: 'KIA-EV6-2024', manufacturer: '기아', model: 'EV6', subModel: 'GT-Line', modelYear: 2024, fuel: '전기', displacement: '—', length: '4,695', reverse: false, version: null, vehicleCount: 8 },
  { id: 'BENZ-E300-2023', code: 'BENZ-E300-2023', manufacturer: '벤츠', model: 'E-Class', subModel: 'E 300 4MATIC', modelYear: 2023, fuel: '휘발유', displacement: '1,999cc', length: '4,935', reverse: true, version: 'v1.1.0', vehicleCount: 3 },
  { id: 'AUDI-A6-2023', code: 'AUDI-A6-2023', manufacturer: '아우디', model: 'A6', subModel: '45 TFSI Premium', modelYear: 2023, fuel: '휘발유', displacement: '1,984cc', length: '4,939', reverse: false, version: null, vehicleCount: 1 },
  { id: 'HY-KONA-2022', code: 'HY-KONA-2022', manufacturer: '현대', model: '코나', subModel: '1.6 하이브리드', modelYear: 2022, fuel: '하이브리드(휘발유+전기)', displacement: '1,580cc', length: '4,205', reverse: true, version: 'v1.3.2', vehicleCount: 9 },
  { id: 'KIA-K5-2022', code: 'KIA-K5-2022', manufacturer: '기아', model: 'K5', subModel: '2.0 LPI', modelYear: 2022, fuel: 'LPG', displacement: '1,999cc', length: '4,905', reverse: false, version: null, vehicleCount: 6 },
  { id: 'HY-STARIA-2023', code: 'HY-STARIA-2023', manufacturer: '현대', model: '스타리아', subModel: '11인승 라운지', modelYear: 2023, fuel: '경유', displacement: '2,199cc', length: '5,253', reverse: true, version: 'v2.1.0', vehicleCount: 11 },
  { id: 'BMW-X5-2024', code: 'BMW-X5-2024', manufacturer: 'BMW', model: 'X5', subModel: 'xDrive40i', modelYear: 2024, fuel: '휘발유', displacement: '2,998cc', length: '4,935', reverse: false, version: null, vehicleCount: 2 },
  { id: 'GEN-GV70-2023', code: 'GEN-GV70-2023', manufacturer: '제네시스', model: 'GV70', subModel: '2.2 디젤', modelYear: 2023, fuel: '경유', displacement: '2,199cc', length: '4,715', reverse: true, version: 'v1.4.1', vehicleCount: 4 },
  { id: 'KIA-SPT-2022', code: 'KIA-SPT-2022', manufacturer: '기아', model: '스포티지', subModel: '1.6 T-GDI 하이브리드', modelYear: 2022, fuel: '하이브리드(휘발유+전기)', displacement: '1,598cc', length: '4,660', reverse: true, version: 'v1.2.0', vehicleCount: 10 },
  { id: 'HY-TUC-2023', code: 'HY-TUC-2023', manufacturer: '현대', model: '투싼', subModel: '2.0 디젤', modelYear: 2023, fuel: '경유', displacement: '1,995cc', length: '4,630', reverse: false, version: null, vehicleCount: 5 },
  { id: 'BENZ-C220-2022', code: 'BENZ-C220-2022', manufacturer: '벤츠', model: 'C-Class', subModel: 'C 220 d', modelYear: 2022, fuel: '경유', displacement: '1,993cc', length: '4,751', reverse: true, version: 'v1.0.2', vehicleCount: 2 },
  { id: 'AUDI-Q5-2024', code: 'AUDI-Q5-2024', manufacturer: '아우디', model: 'Q5', subModel: '45 TFSI quattro', modelYear: 2024, fuel: '휘발유', displacement: '1,984cc', length: '4,682', reverse: false, version: null, vehicleCount: 1 },
  { id: 'HY-IONIQ5-2024', code: 'HY-IONIQ5-2024', manufacturer: '현대', model: '아이오닉 5', subModel: '롱레인지 프레스티지', modelYear: 2024, fuel: '전기', displacement: '—', length: '4,635', reverse: false, version: null, vehicleCount: 7 },
];

export const MANUFACTURER_OPTIONS = [
  { value: '', label: '전체' },
  { value: '현대', label: '현대' },
  { value: '기아', label: '기아' },
  { value: '제네시스', label: '제네시스' },
  { value: '벤츠', label: '벤츠' },
  { value: 'BMW', label: 'BMW' },
  { value: '아우디', label: '아우디' },
];

export const MODEL_OPTIONS = [{ value: '', label: '전체' }];

export const MODEL_YEAR_OPTIONS = [
  { value: '', label: '전체' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
];

export const CAR_CODE_TOTAL_COUNT = 248;

/** 카코드 등록/수정 팝업 — 국산/수입 → 제조사 → 모델명 캐스케이드 옵션. */
export const ORIGIN_OPTIONS = [
  { value: 'domestic', label: '국산차' },
  { value: 'import', label: '수입차' },
];

export const BRANDS_BY_ORIGIN: Record<string, { value: string; label: string }[]> = {
  domestic: [
    { value: '현대', label: '현대' },
    { value: '기아', label: '기아' },
    { value: '제네시스', label: '제네시스' },
  ],
  import: [
    { value: 'BMW', label: 'BMW' },
    { value: '벤츠', label: '벤츠' },
    { value: '아우디', label: '아우디' },
  ],
};

export const MODELS_BY_BRAND: Record<string, { value: string; label: string }[]> = {
  현대: [
    { value: '아이오닉 6', label: '아이오닉 6' },
    { value: '아이오닉 5', label: '아이오닉 5' },
    { value: '팰리세이드', label: '팰리세이드' },
    { value: '쏘나타', label: '쏘나타' },
    { value: '그랜저', label: '그랜저' },
    { value: '코나', label: '코나' },
    { value: '투싼', label: '투싼' },
    { value: '스타리아', label: '스타리아' },
  ],
  기아: [
    { value: '카니발', label: '카니발' },
    { value: 'EV6', label: 'EV6' },
    { value: 'K5', label: 'K5' },
    { value: '스포티지', label: '스포티지' },
  ],
  제네시스: [
    { value: 'G80', label: 'G80' },
    { value: 'GV70', label: 'GV70' },
  ],
  BMW: [
    { value: '5시리즈', label: '5시리즈' },
    { value: 'X5', label: 'X5' },
  ],
  벤츠: [
    { value: 'E-Class', label: 'E-Class' },
    { value: 'C-Class', label: 'C-Class' },
  ],
  아우디: [
    { value: 'A6', label: 'A6' },
    { value: 'Q5', label: 'Q5' },
  ],
};

export const FUEL_OPTIONS = [
  { value: '경유', label: '경유' },
  { value: '휘발유', label: '휘발유' },
  { value: '휘발유(무연)', label: '휘발유(무연)' },
  { value: 'LPG', label: 'LPG' },
  { value: '전기', label: '전기' },
  { value: '하이브리드(경유+전기)', label: '하이브리드(경유+전기)' },
  { value: '하이브리드(휘발유+전기)', label: '하이브리드(휘발유+전기)' },
];

// 공용 상수 LIST_PAGE_SIZE 는 `src/components/ui-rules.ts` 로 이동. 하위 호환용 re-export.
export { LIST_PAGE_SIZE } from '../../components/ui-rules';
