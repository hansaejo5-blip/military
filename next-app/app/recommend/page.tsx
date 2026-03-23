import Link from 'next/link';

import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { getPlannerSnapshot } from '@/lib/recommendation';

export default function RecommendPage() {
  const snapshot = getPlannerSnapshot();

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success">지금 바로 지원 가능</StatusBadge>
          <StatusBadge status="warning">1개 추가 시 가능</StatusBadge>
          <StatusBadge status="danger">현재 불가</StatusBadge>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">추천 결과</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">추천은 문장 생성이 아니라 자격요건, 전공, 자격증, 어학, 신체조건, 희망 입영 시기를 기준으로 계산합니다.</p>
      </section>

      <section className="grid gap-4">
        {snapshot.recommendations.map((result) => (
          <SectionCard key={result.specialtyId} title={`${result.branch} · ${result.specialtyName}`} description={result.nextAction} right={<StatusBadge status={result.status}>{result.statusLabel}</StatusBadge>}>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 text-sm text-slate-700">
                <div className="grid gap-2 md:grid-cols-2">
                  <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">전공 적합 여부: {result.majorFit}</p>
                  <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">자격증 적합 여부: {result.certificateFit}</p>
                  <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">신체조건 충족 여부: {result.physicalFit}</p>
                  <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">다음 모집 일정: {result.nextRecruitmentLabel}</p>
                </div>
                <ul className="space-y-2">
                  {result.reasons.map((reason) => (
                    <li key={reason} className="rounded-2xl border border-slate-100 bg-white px-4 py-3">{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">신뢰도</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.sources.map((source) => (
                      <TrustBadge key={source.label} label={source.label} tone={source.tone} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">다음 행동</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{result.nextAction}</p>
                  <Link href={`/specialty/${result.specialtyId}`} className="mt-4 inline-flex rounded-2xl bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white">특기 상세 보기</Link>
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </section>
    </main>
  );
}
