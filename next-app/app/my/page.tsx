import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { alerts, currentUserProfile } from '@/data/mock-data';

export default function MyPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <TrustBadge label="Firestore 저장 대상" tone="info" />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">마이페이지</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">온보딩에서 받은 정보는 마이페이지에서 수정할 수 있어야 하며, 추천 캐시와 알림 설정도 같은 흐름에서 관리합니다.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="내 정보" description="수정 가능한 사용자 프로필 목업">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">출생연도: {currentUserProfile.birthYear}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">희망 군: {currentUserProfile.preferredBranches.join(', ')}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">전공: {currentUserProfile.major}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">학교 유형: {currentUserProfile.schoolType}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">자격증: {currentUserProfile.certificates.join(', ') || '없음'}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">어학: {currentUserProfile.languageScores.map((score) => `${score.examType} ${score.score}`).join(', ') || '없음'}</div>
          </div>
        </SectionCard>

        <SectionCard title="알림 설정" description="선착순 / 추가모집 / 마감 임박 / 자격증 역산 위험">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.alertId} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{alert.type}</p>
                  <StatusBadge status={alert.isEnabled ? 'success' : 'default'}>{alert.isEnabled ? '켜짐' : '꺼짐'}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{alert.targetBranch ?? '공통'} · {alert.targetSpecialtyId ?? '전체'}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
