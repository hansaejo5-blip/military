export const summaryStats = [
  { label: '지금 지원 가능', value: '3개', hint: '육군 2, 공군 1' },
  { label: '조건부 가능', value: '5개', hint: '자격증 보완 필요' },
  { label: '다음 마감', value: '5일', hint: '3월 기술행정병 접수' },
  { label: '위험 알림', value: '2건', hint: '서류·발급 일정 확인' },
];

export const homeStatusCards = [
  {
    title: '내 상태',
    value: '지원 가능한 분야 3개',
    tone: 'success' as const,
    detail: '전공과 보유 자격증 기준으로 즉시 지원 가능한 분야입니다.',
  },
  {
    title: '자격증 경고',
    value: '전기기능사 발급 일정 확인 필요',
    tone: 'warning' as const,
    detail: '접수 마감 전 발급 완료 상태가 안전합니다.',
  },
  {
    title: '선착순 레이더',
    value: '추가모집 키워드 감지 1건',
    tone: 'info' as const,
    detail: '최근 공지 본문에서 추가접수 문구가 확인됐습니다.',
  },
];

export const recommendations = [
  {
    name: '육군 기술행정병 전기정비',
    branch: '육군',
    status: '지금 지원 가능',
    tone: 'success' as const,
    majorMatch: '전공 직접 일치',
    certificateMatch: '전기기능사 보유 시 매우 유리',
    physical: '신체조건 충족',
    nextSchedule: '3월 29일 접수 마감',
    documents: '자격증 사본, 학력증명',
  },
  {
    name: '공군 일반기계',
    branch: '공군',
    status: '조건부 가능',
    tone: 'warning' as const,
    majorMatch: '전공 간접 일치',
    certificateMatch: '기계계열 자격증 추가 시 점수 상승',
    physical: '시력 기준 재확인 필요',
    nextSchedule: '4월 8일 모집 시작',
    documents: '어학성적, 자격증 사본',
  },
  {
    name: '카투사',
    branch: '카투사',
    status: '현재 불가',
    tone: 'danger' as const,
    majorMatch: '전공 무관',
    certificateMatch: '어학점수 부족',
    physical: '신체조건은 충족',
    nextSchedule: '하반기 공고 대기',
    documents: '어학성적표',
  },
];

export const scheduleItems = [
  {
    type: '모집 마감',
    date: '3월 29일',
    title: '육군 기술행정병 1차 접수 마감',
    urgency: 'D-5',
  },
  {
    type: '서류 제출',
    date: '4월 2일',
    title: '전기정비 지원서류 업로드 마감',
    urgency: 'D-9',
  },
  {
    type: '추가모집',
    date: '상시 감시',
    title: '추가접수·선착순 공지 키워드 모니터링',
    urgency: '실시간',
  },
  {
    type: '합격 발표',
    date: '4월 18일',
    title: '1차 합격 발표 예정',
    urgency: '예정',
  },
];

export const guideTopics = [
  {
    title: '모집병 vs 징집 vs 현역',
    points: [
      '현역 입영에는 징집과 모집병 지원 방식이 함께 존재합니다.',
      '징집은 보직 선택 폭이 낮고 모집병은 군·특기 선택이 가능합니다.',
      '육군은 징집과 모집이 함께 있고, 공군·해군은 모집 중심으로 이해하면 됩니다.',
    ],
  },
  {
    title: '육군 일반병 vs 기술행정병',
    points: [
      '일반병은 빠른 입영이 강점이고, 기술행정병은 전공·자격증 활용도가 높습니다.',
      '기술행정병은 자격증과 학과 관련성이 점수와 직결됩니다.',
      '준비 부담이 늘어나는 대신 원하는 분야를 노리기 좋습니다.',
    ],
  },
];

export const checklistItems = [
  '전공명 표기와 학적 상태를 공식 서류 기준으로 다시 확인하기',
  '자격증 발급 가능일이 접수 마감 전인지 점검하기',
  '어학성적 유효기간과 제출 방식 확인하기',
  '관심 특기 알림과 추가모집 알림 모두 켜기',
  '지원 직전 서류 업로드 방식과 마감 시각 재확인하기',
];

export const onboardingFields = [
  '출생연도',
  '희망 군 복수선택',
  '희망 입영 시기',
  '전공명과 학교 유형',
  '보유 자격증과 어학점수',
  '신체등급, 시력, 색약 여부',
  '중요 기준: 빨리 가기 / 전공 살리기 / 자격증 활용',
];

export const plannerPrinciples = [
  '설명보다 행동을 유도합니다.',
  '공식 데이터, 공식 공지, 계산 추정치를 구분해서 보여줍니다.',
  '최종 지원 전에는 공식 사이트 재확인을 항상 안내합니다.',
];
