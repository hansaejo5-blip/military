import { alerts, certificateExams, recruitNotices, specialties } from '@/data/mock-data';
import { getEligibleSpecialties } from '@/lib/recommendation';
import type {
  AlertRadarService,
  ExamScheduleSourceService,
  RecommendationEngineService,
  RecruitmentSourceService,
} from '@/services/contracts';
import type { UserProfile } from '@/types/planner';

export const recruitmentMockService: RecruitmentSourceService = {
  async listRecruitNotices() {
    return recruitNotices;
  },
  async listSpecialties() {
    return specialties;
  },
};

export const examMockService: ExamScheduleSourceService = {
  async listCertificateExams() {
    return certificateExams;
  },
};

export const recommendationMockService: RecommendationEngineService = {
  async getEligibleSpecialties(profile: UserProfile) {
    return getEligibleSpecialties(profile);
  },
};

export const alertMockService: AlertRadarService = {
  async listAlertSettings() {
    return alerts;
  },
};
