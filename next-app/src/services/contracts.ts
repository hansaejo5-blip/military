import type {
  AlertSetting,
  CertificateExam,
  RecommendationResult,
  RecruitNotice,
  Specialty,
  UserProfile,
} from '@/types/planner';

export interface RecruitmentSourceService {
  listRecruitNotices(): Promise<RecruitNotice[]>;
  listSpecialties(): Promise<Specialty[]>;
}

export interface ExamScheduleSourceService {
  listCertificateExams(): Promise<CertificateExam[]>;
}

export interface RecommendationEngineService {
  getEligibleSpecialties(profile: UserProfile): Promise<RecommendationResult[]>;
}

export interface AlertRadarService {
  listAlertSettings(uid: string): Promise<AlertSetting[]>;
}
