# Firestore 컬렉션 및 보안 규칙 초안

## 컬렉션
- `users`
- `recruit_notices`
- `specialties`
- `eligibility_rules`
- `score_rules`
- `documents`
- `certificate_exams`
- `recommendation_cache`
- `alerts`
- `change_logs`

## 설계 원칙
- 읽기 많은 데이터는 문서 단위 캐싱
- 추천 결과는 서버 계산 후 캐시
- 공지 원문과 정규화 필드 모두 저장
- 변동 이력 보관

## 보안 규칙 초안
```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    match /recommendation_cache/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }

    match /alerts/{alertId} {
      allow read, write: if request.auth != null;
    }

    match /recruit_notices/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /specialties/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /eligibility_rules/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /score_rules/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /documents/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /certificate_exams/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /change_logs/{doc} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```
