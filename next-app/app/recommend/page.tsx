import { RecommendExplorer } from '@/components/recommend-explorer';
import { StatusBadge } from '@/components/status-badge';
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

      <RecommendExplorer recommendations={snapshot.recommendations} />
    </main>
  );
}
