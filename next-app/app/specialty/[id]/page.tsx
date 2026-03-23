import { notFound } from 'next/navigation';

import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { specialties } from '@/data/mock-data';
import { buildActionChecklist, getPlannerSnapshot } from '@/lib/recommendation';

export default async function SpecialtyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const specialty = specialties.find((item) => item.specialtyId === id);
  if (!specialty) notFound();

  const snapshot = getPlannerSnapshot();
  const recommendation = snapshot.recommendations.find((item) => item.specialtyId === id);
  const checklist = buildActionChecklist(snapshot.userProfile, specialty);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <TrustBadge label="특기 상세" tone="info" />
          {recommendation ? <StatusBadge status={recommendation.status}>{recommendation.statusLabel}</StatusBadge> : null}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{specialty.specialtyName}</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">{specialty.description}</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="지원 조건" description="관련 전공, 자격증, 서류, 기준일을 함께 봅니다.">
          <div className="grid gap-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 px-4 py-4">관련 전공: {specialty.relatedMajors.join(', ') || '전공 무관'}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4">필요 자격증: {specialty.requiredCertificates.join(', ') || '없음'}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4">추천 자격증: {specialty.recommendedCertificates.join(', ') || '없음'}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4">구비서류: {specialty.requiredDocuments.join(', ')}</div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4">배점 구조: {specialty.scoreSummary}</div>
          </div>
        </SectionCard>

        <SectionCard title="체크리스트" description="지원 전 꼭 확인해야 하는 항목">
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            {checklist.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">{item}</li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </main>
  );
}
