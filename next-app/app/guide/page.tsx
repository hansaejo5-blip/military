import { SectionCard } from '@/components/section-card';
import { TrustBadge } from '@/components/trust-badge';
import { conceptCards } from '@/data/mock-data';

export default function GuidePage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <TrustBadge label="3분 개념 정리" tone="info" />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">군별 가이드</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">사용자가 가장 자주 헷갈리는 개념만 카드형으로 정리했습니다. 긴 설명 대신 지원 방식과 선택 가능 범위를 빠르게 이해하는 데 집중합니다.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {conceptCards.map((card) => (
          <SectionCard key={card.title} title={card.title} description={card.description} right={<TrustBadge label={card.sourceLabel} tone={card.tone} />}>
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              {card.points.map((point) => (
                <li key={point} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">{point}</li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </section>
    </main>
  );
}
