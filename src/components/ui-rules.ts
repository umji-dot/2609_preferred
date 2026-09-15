/**
 * 앱 공용 UI 규칙 · 상수.
 *
 * DS 가 정식으로 지원하기 전까지 앱 레벨에서 통일하는 UI 원칙을 상수로 관리한다.
 * 세부 CSS 규칙(행 높이 40px, 셀렉트 텍스트 gray-900, 좌측 메뉴 padding 등)은
 * `src/styles/globals.css` 에 명명된 규칙으로 정의되어 있고 앱 공용으로 자동 적용된다.
 *
 * 정본 문서: `.claude/skills/design-publish/repo-rules.md` §7 "공통 UI 규칙".
 */

/** 목록 페이지 기본 pageSize (모든 관리자 목록 표 공통). */
export const LIST_PAGE_SIZE = 20;
