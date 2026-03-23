# 군지원 플래너 Next.js 웹앱

Firebase Studio와 Codex에서 바로 이어서 개발할 수 있도록 설계한 한국어 기반 반응형 PWA 골격입니다.

## 포함 범위

- App Router 기반 화면
- Tailwind CSS 기반 UI
- Firestore 컬렉션 타입
- 목업 데이터
- 추천 엔진 함수
- 카투사 추천 로직
- 자격증 / 어학시험 역산 유틸
- 데이터 소스 서비스 레이어 인터페이스

## 구조

- `app/`: 홈, 추천, 일정, 군별 가이드, 마이페이지, 특기 상세
- `src/types/`: Firestore 및 도메인 타입
- `src/data/`: 목업 데이터
- `src/lib/`: 추천 엔진과 날짜 계산 유틸
- `src/services/`: 추후 실제 API 연동용 인터페이스와 목업 서비스
- `src/components/`: 카드, 배지, 입력/결과 UI

## 실행

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000` 입니다.
