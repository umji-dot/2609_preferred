# installer-design

Installer 퍼블리싱 프로젝트.

## 시작

```bash
npm install
npm run dev
```

## 작업 규칙

AI가 숙지할 작업 규칙을 다음 경로에 작성해두었습니다.

기본적으로 클로드 코드 사용시 규칙을 숙지하는 경로이지만 가끔 빼먹는 경우가 있으니 작업을 시작하기 전에 반드시 [`.claude/CLAUDE.md`](./.claude/CLAUDE.md)의 프로젝트 규칙을 먼저 숙지하고 작업하라고 명령해주세요.

코덱스, 제미나이 사용시 각 도구의 맞는 경로에 규칙 복사가 필요합니다.

## 디자인 시스템

- 저장소: https://github.com/imasdev/installer-design-system
- 이 프로젝트는 IDS (Installer Design System) 컴포넌트·토큰만 사용합니다
- 없는 컴포넌트가 필요하면 피그마 디자인 시스템 추가 후 반영 요청 부탁드립니다.

## IDS 업데이트

```bash
npm install
```

IDS `main` 최신 버전을 받아옵니다.
