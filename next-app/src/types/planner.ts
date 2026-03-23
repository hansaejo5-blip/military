export type Branch = '육군' | '해군' | '공군' | '카투사';
export type SchoolType = '고졸' | '전문대' | '4년제' | '기타';
export type GradeStatus = '재학' | '졸업' | '수료';
export type PriorityType =
  | '빨리 입대'
  | '전공 활용'
  | '자격증 활용'
  | '카투사 우선'
  | '공군/해군 선호'
  | '준비 부담 최소화';
export type Confidence = 'official_api' | 'official_notice' | 'official_exam' | 'estimated' | 'reviewed';

export interface LanguageScore {
  examType: 'TOEIC' | 'TOEIC Speaking';
  score: number;
  acquiredAt: string;
}

export interface UserProfile {
  uid: string;
  birthYear: number;
  preferredBranches: Branch[];
  preferredEnlistmentMonths: string[];
  major: string;
  schoolType: SchoolType;
  gradeStatus: GradeStatus;
  certificates: string[];
  languageScores: LanguageScore[];
  physicalGrade: number;
  vision: string;
  colorWeakness: boolean;
  priorities: PriorityType[];
}

export interface RecruitNotice {
  noticeId: string;
  branch: Branch;
  specialtyId: string;
  title: string;
  applyStartAt: string;
  applyEndAt: string;
  firstResultAt: string;
  documentDeadlineAt: string;
  enlistmentMonth: string;
  isFirstComeFirstServed: boolean;
  isAdditionalRecruitment: boolean;
  sourceType: Confidence;
  sourceUrl: string;
}

export interface Specialty {
  specialtyId: string;
  branch: Branch;
  specialtyName: string;
  description: string;
  relatedMajors: string[];
  requiredCertificates: string[];
  recommendedCertificates: string[];
  requiredDocuments: string[];
  scoreSummary: string;
  interviewRequired: boolean;
  languageRequirement?: {
    examType: LanguageScore['examType'];
    minScore: number;
  };
}

export interface EligibilityRule {
  ruleId: string;
  specialtyId: string;
  allowedBranches: Branch[];
  relatedMajorKeywords: string[];
  requiredCertificates: string[];
  preferredCertificates: string[];
  minPhysicalGrade: number;
  allowedVisionKeywords: string[];
  colorWeaknessAllowed: boolean;
  preferredEnlistmentMonths: string[];
  languageRequirement?: Specialty['languageRequirement'];
}

export interface ScoreRule {
  scoreRuleId: string;
  specialtyId: string;
  certificateWeight: number;
  majorWeight: number;
  languageWeight: number;
  interviewWeight: number;
}

export interface DocumentRequirement {
  documentId: string;
  specialtyId: string;
  documentName: string;
  submitDeadlineRule: string;
  requiredCondition: string;
}

export interface CertificateExam {
  examId: string;
  provider: string;
  examName: string;
  certificateName: string;
  regularRegistrationStartAt: string;
  regularRegistrationEndAt: string;
  lateRegistrationStartAt?: string;
  lateRegistrationEndAt?: string;
  examDate: string;
  resultDate: string;
  issueAvailableDate: string;
  examFee: number;
  sourceUrl: string;
  sourceType: Confidence;
  sourceLabel: string;
  sourceTone: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export interface AlertSetting {
  alertId: string;
  type: string;
  targetBranch?: Branch;
  targetSpecialtyId?: string;
  isEnabled: boolean;
}

export interface RecommendationResult {
  specialtyId: string;
  branch: Branch;
  specialtyName: string;
  status: 'success' | 'warning' | 'default' | 'danger';
  statusLabel: string;
  majorFit: string;
  certificateFit: string;
  physicalFit: string;
  nextRecruitmentLabel: string;
  nextAction: string;
  reasons: string[];
  documents: string[];
  sources: { label: string; tone: 'default' | 'success' | 'warning' | 'danger' | 'info' }[];
}

export interface DeadlineAssessment {
  인정기준일: string;
  권장시험응시마감: string;
  발표완료마감: string;
  발급여유마감: string;
  위험도: '안전' | '촉박' | '현실적으로 어려움';
}

export interface KatusaRecommendation {
  needed: boolean;
  headline: string;
  details: string[];
  examOptions: {
    examId: string;
    examName: string;
    examDate: string;
    resultDate: string;
    examFee: number;
    feasibility: '안전' | '촉박' | '현실적으로 어려움';
  }[];
}
