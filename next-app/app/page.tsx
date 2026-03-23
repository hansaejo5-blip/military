import Link from 'next/link';

import { PlannerWorkspace } from '@/components/planner-workspace';
import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { getPlannerSnapshot } from '@/lib/recommendation';

export default function HomePage() {
  const snapshot = getPlannerSnapshot();

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <TrustBadge label="비공식 서비스" tone="warning" />
          <TrustBadge label="최종 확인은 병무청 공식 사이트" tone="info" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">나는 어디 지원 가능한가</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600 sm:text-base">
          군지원 플래너는 징집, 모집병, 기술행정병, 공군, 해군, 카투사의 차이를 빠르게 정리하고 사용자의 전공, 자격증, 어학점수, 신체조건, 희망 입영 시기를 바탕으로 지금 가능한 지원 경로와 다음 행동을 바로 보여주는 판단 도구입니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/recommend" className="rounded-2xl bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white">추천 결과 보기</Link>
          <Link href="/guide" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">개념 먼저 이해하기</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {snapshot.summary.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{item.value}</p>
            <p className="mt-1 text-sm text-slate-600">{item.hint}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <PlannerWorkspace />

        <div className="flex flex-col gap-6">
          <SectionCard title="오늘 해야 할 일" description="긴 설명보다 지금 당장 해야 할 행동을 먼저 제시합니다." right={<StatusBadge status="warning">우선순위</StatusBadge>}>
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              {snapshot.todayActions.map((action) => (
                <li key={action} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">{action}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="선착순 / 추가모집 레이더" description="관심 군과 특기를 저장하면 공지 변동을 감지해 알림으로 연결합니다." right={<TrustBadge label="공식 공지 기반" tone="success" />}>
            <div className="space-y-3">
              {snapshot.alertRadar.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <StatusBadge status={item.status}>{item.badge}</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
