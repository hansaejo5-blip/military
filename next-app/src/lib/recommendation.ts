import {
  alerts,
  certificateExams,
  currentUserProfile,
  eligibilityRules,
  recruitNotices,
  specialties,
  today,
} from '@/data/mock-data';
import { calculateSafeExamDeadline, daysUntil, formatDateLabel } from '@/lib/date';
import type {
  DeadlineAssessment,
  KatusaRecommendation,
  RecommendationResult,
  Specialty,
  UserProfile,
} from '@/types/planner';

export function getUpcomingRecruitmentWindows(specialtyId: string) {
  return recruitNotices
    .filter((notice) => notice.specialtyId === specialtyId)
    .sort((a, b) => a.applyStartAt.localeCompare(b.applyStartAt));
}

export function getMissingRequirements(profile: UserProfile, specialty: Specialty) {
  const rule = eligibilityRules.find((item) => item.specialtyId === specialty.specialtyId);
  if (!rule) return [];

  const missing: string[] = [];
  const majorMatched =
    rule.relatedMajorKeywords.length === 0 ||
    rule.relatedMajorKeywords.some((keyword) => profile.major.includes(keyword));

  const languageMatched =
    !rule.languageRequirement ||
    profile.languageScores.some(
      (score) => score.examType === rule.languageRequirement?.examType && score.score >= rule.languageRequirement.minScore
    );

  if (!majorMatched) missing.push('관련 전공 일치도가 낮습니다');
  if (!languageMatched && rule.languageRequirement) {
    missing.push(`${rule.languageRequirement.examType} ${rule.languageRequirement.minScore}점 이상이 필요합니다`);
  }
  if (profile.physicalGrade > rule.minPhysicalGrade) missing.push(`신체등급 ${rule.minPhysicalGrade}급 이내가 유리합니다`);
  if (!rule.colorWeaknessAllowed && profile.colorWeakness) missing.push('색약/색맹 기준을 다시 확인해야 합니다');
  if (!rule.preferredEnlistmentMonths.some((month) => profile.preferredEnlistmentMonths.includes(month))) {
    missing.push('희망 입영 시기와 모집 회차가 맞지 않습니다');
  }

  return missing;
}

export function getRecommendedCertificates(profile: UserProfile, specialty: Specialty) {
  return specialty.recommendedCertificates.filter((certificate) => !profile.certificates.includes(certificate));
}

export function buildActionChecklist(profile: UserProfile, specialty: Specialty) {
  const checklist = [
    '접수 마감 전 발급 완료 여부 확인',
    '어학성적 유효기간 확인',
    '필수 서류 업로드 일정 확인',
  ];

  if (specialty.interviewRequired) checklist.push('면접 여부와 일정 확인');
  getRecommendedCertificates(profile, specialty).forEach((certificate) => checklist.push(`${certificate} 취득 가능 회차 검토`));
  if (specialty.branch === '카투사') {
    checklist.push('정기시험 성적만 인정되는지 확인');
    checklist.push('접수 시점에 발표 완료된 점수인지 확인');
  }
  checklist.push('선착순 / 추가모집 알림 켜기');
  return checklist;
}

export function getEligibleSpecialties(profile: UserProfile): RecommendationResult[] {
  const rank: Record<RecommendationResult['status'], number> = {
    success: 0,
    warning: 1,
    default: 2,
    danger: 3,
  };

  return specialties
    .filter((specialty) => profile.preferredBranches.includes(specialty.branch))
    .map((specialty) => {
      const missing = getMissingRequirements(profile, specialty);
      const nextNotice = getUpcomingRecruitmentWindows(specialty.specialtyId)[0];
      const recommendedCertificates = getRecommendedCertificates(profile, specialty);
      const majorFit =
        specialty.relatedMajors.length === 0
          ? '전공 무관'
          : specialty.relatedMajors.some((major) => profile.major.includes(major.replace('공학', '')))
            ? '전공 직접 연관'
            : '전공 간접 연관';

      const base: RecommendationResult = {
        specialtyId: specialty.specialtyId,
        branch: specialty.branch,
        specialtyName: specialty.specialtyName,
        status: 'default',
        statusLabel: '조건 검토 필요',
        majorFit,
        certificateFit: recommendedCertificates.length === specialty.recommendedCertificates.length ? '관련 자격증 없음' : '관련 자격증 일부 보유',
        physicalFit: profile.physicalGrade <= 3 ? '기본 충족' : '재확인 필요',
        nextRecruitmentLabel: nextNotice ? `${formatDateLabel(nextNotice.applyStartAt)} ~ ${formatDateLabel(nextNotice.applyEndAt)}` : '모집 일정 확인 필요',
        nextAction: '최신 공지와 제출 서류를 다시 확인하세요.',
        reasons: [],
        documents: specialty.requiredDocuments,
        sources: [
          { label: nextNotice?.sourceType === 'estimated' ? '계산 추정치' : '공식 공지 기반', tone: nextNotice?.sourceType === 'estimated' ? 'warning' : 'success' },
          { label: '계산 추정치', tone: 'info' },
        ],
      };

      if (missing.length === 0) {
        const result: RecommendationResult = {
          ...base,
          status: 'success',
          statusLabel: '지금 바로 지원 가능',
          certificateFit: recommendedCertificates.length > 0 ? `자격증 추가 시 더 유리 (${recommendedCertificates[0]})` : '현재 조건으로도 지원 가능',
          nextAction: '지금 회차의 서류 마감과 제출 형식을 확인하세요.',
          reasons: [
            '기본 지원요건을 충족합니다',
            recommendedCertificates.length > 0 ? `${recommendedCertificates[0]} 취득 시 경쟁력이 더 올라갑니다` : '현재 조건으로 바로 도전 가능합니다',
            nextNotice ? `접수 마감까지 ${daysUntil(today, nextNotice.applyEndAt)}일 남았습니다` : '최신 회차 확인 필요',
          ],
        };
        return result;
      }

      if (missing.length <= 2) {
        const result: RecommendationResult = {
          ...base,
          status: 'warning',
          statusLabel: '자격증 / 어학 1개 추가 시 가능',
          certificateFit: recommendedCertificates.length > 0 ? `${recommendedCertificates.join(', ')} 중 1개 확보 권장` : '보완 요소 소수',
          nextAction: missing[0],
          reasons: missing,
        };
        return result;
      }

      const result: RecommendationResult = {
        ...base,
        status: 'danger',
        statusLabel: '현재 지원 불가',
        nextAction: missing[0],
        reasons: missing,
      };
      return result;
    })
    .sort((a, b) => rank[a.status] - rank[b.status]);
}

export function calculateSpecialtyDeadline(specialtyId: string, certificateName?: string): DeadlineAssessment | null {
  const nextNotice = getUpcomingRecruitmentWindows(specialtyId)[0];
  if (!nextNotice) return null;

  const exam = certificateExams.find((item) => item.certificateName === certificateName) ?? certificateExams[0];
  return calculateSafeExamDeadline(nextNotice.applyEndAt, exam.resultDate, exam.issueAvailableDate);
}

export function getKatusaRecommendation(profile: UserProfile): KatusaRecommendation {
  const notice = recruitNotices.find((item) => item.specialtyId === 'katusa');
  const rule = eligibilityRules.find((item) => item.specialtyId === 'katusa')?.languageRequirement;
  const currentToeic = profile.languageScores.find((score) => score.examType === 'TOEIC');
  const examOptions = certificateExams
    .filter((exam) => exam.certificateName === 'TOEIC')
    .map((exam) => ({
      examId: exam.examId,
      examName: exam.examName,
      examDate: exam.examDate,
      resultDate: exam.resultDate,
      examFee: exam.examFee,
      feasibility: calculateSafeExamDeadline(notice?.applyEndAt ?? '2026-07-20', exam.resultDate, exam.issueAvailableDate).위험도,
    }));

  if (currentToeic && rule && currentToeic.score >= rule.minScore) {
    return {
      needed: false,
      headline: '현재 TOEIC 점수로 카투사 기준을 충족합니다',
      details: [
        `현재 점수: TOEIC ${currentToeic.score}`,
        '정기시험 성적이고 접수 시점에 발표 완료된 점수인지 확인하세요',
        `예상 접수 시기: ${notice ? formatDateLabel(notice.applyStartAt) : '직전 연도 기준 7월 전후'}`,
      ],
      examOptions,
    };
  }

  return {
    needed: true,
    headline: `카투사를 노리려면 TOEIC ${rule?.minScore ?? 780}점 이상이 필요합니다`,
    details: [
      '현재 영어점수가 없거나 기준 미달입니다',
      `예상 접수 시기: ${notice ? `${formatDateLabel(notice.applyStartAt)} ~ ${formatDateLabel(notice.applyEndAt)}` : '직전 연도 기준 7월 전후'}`,
      '어학성적은 접수일 기준 2년 이내, 정기시험, 접수 시점에 발표 완료된 점수여야 합니다',
      '최신 공지가 아직 없으면 직전 연도 기준 예상으로 보되 추정 배지를 붙입니다',
    ],
    examOptions,
  };
}

export function getPlannerSnapshot() {
  const recommendations = getEligibleSpecialties(currentUserProfile);
  const katusa = getKatusaRecommendation(currentUserProfile);
  const topDeadline = recruitNotices.map((notice) => daysUntil(today, notice.applyEndAt)).sort((a, b) => a - b)[0];

  return {
    userProfile: currentUserProfile,
    recommendations,
    katusa,
    summary: [
      { label: '지금 지원 가능', value: `${recommendations.filter((item) => item.status === 'success').length}개`, hint: '즉시 지원 가능한 분야' },
      { label: '보완 후 가능', value: `${recommendations.filter((item) => item.status === 'warning').length}개`, hint: '자격증 또는 어학 1개 추가' },
      { label: '다음 마감', value: `${topDeadline}일`, hint: '가장 가까운 접수 마감 기준' },
      { label: '추가모집 감시', value: `${alerts.filter((item) => item.isEnabled).length}건`, hint: '레이더 알림 활성화' },
    ],
    todayActions: [
      '희망 특기의 접수 마감일과 서류 마감일을 분리해서 확인하기',
      '어학성적 또는 자격증이 접수 시점에 발표 완료되는지 검토하기',
      '선착순 / 추가모집 알림을 켜고 관심 특기를 저장하기',
    ],
    alertRadar: [
      {
        title: '육군 정보통신 추가모집 키워드 감시',
        badge: '감시 중',
        status: 'warning' as const,
        description: '공지 본문에 추가모집, 추가접수, 선착순 키워드가 생기면 즉시 알림으로 연결합니다.',
      },
      {
        title: '카투사 최신 공지 대기',
        badge: '추정 회차',
        status: 'default' as const,
        description: '현재는 직전 연도 기준 예상 접수 창을 사용 중이며, 최신 공지 확인 시 자동 갱신 대상입니다.',
      },
    ],
  };
}
