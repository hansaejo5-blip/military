# 군지원 플래너

군지원 플래너는 병무청 및 각 군의 모집 정보를 사용자가 빠르게 판단할 수 있도록 정리하는 비공식 실용형 앱입니다.

## 핵심 목표

- 어떤 방식으로 군대에 갈 수 있는지 빠르게 이해하기
- 지금 지원 가능한 분야를 조건 기반으로 바로 확인하기
- 무엇을 더 준비해야 하는지 체크리스트로 정리하기
- 언제까지 해야 하는지 일정과 마감 리스크로 확인하기

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npx expo start
```

3. 웹으로 확인

```bash
npm run web
```

## 현재 구성

- `app/`: Expo Router 기반 화면
- `components/`: 공용 UI 컴포넌트
- `constants/`: 테마 및 목업 데이터
- `docs/`: 와이어프레임, Firestore 초안, 추천 로직 문서

## 주요 문서

- `docs/wireframe.md`
- `docs/firebase-studio-master-prompt.md`
- `docs/firestore-rules-and-schema.md`
- `docs/recommendation-pseudocode.md`
- `docs/mvp-screen-checklist.md`

## 주의 사항

- 이 앱은 정부 공식 서비스가 아닙니다.
- 최종 지원 전에는 병무청 및 각 군 공식 사이트를 반드시 다시 확인해야 합니다.
- 민감한 개인정보는 최소한으로 다루는 방향을 기준으로 설계합니다.
