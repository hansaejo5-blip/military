# 추천 로직 의사코드

```txt
input: userProfile, specialties, eligibilityRules, scoreRules, recruitNotices

1. candidateSpecialties = specialties filtered by preferredBranches
2. for each specialty in candidateSpecialties:
   a. load eligibility rule
   b. if age/physical/vision/language requirements fail:
      classify as "현재 불가"
      attach blocking reason
      continue
   c. evaluate major relation:
      direct / indirect / none
   d. evaluate certificate relation:
      direct / indirect / none
   e. calculate expected score using scoreRules
   f. load nearest active or upcoming notice
   g. validate schedule feasibility:
      - 접수 마감 전 자격증 발급 가능 여부
      - 어학성적 유효기간
      - 서류 제출 가능 여부
   h. classify result:
      - 지금 지원 가능
      - 자격증 추가 시 가능
      - 일정상 대기 필요
      - 현재 불가
3. sort results by:
   - 지금 지원 가능
   - 전공 활용도
   - 자격증 추가 시 기대효과
   - 일정 현실성
   - user priorityType
4. generate warnings and nextActions
5. cache result in recommendation_cache
output: results, warnings, nextActions
```
