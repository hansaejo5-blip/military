'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { filterRecommendationsByQuery } from '@/lib/recommendation';
import type { RecommendationResult } from '@/types/planner';

const quickQueries = ['카투사', '정보통신', '전기', '공군', '자격증', '지금 지원 가능'];

export function RecommendExplorer({
  recommendations,
}: {
  recommendations: RecommendationResult[];
}) {
  const [query, setQuery] = useState('');

  const filteredRecommendations = useMemo(
    () => filterRecommendationsByQuery(recommendations, query),
    [recommendations, query]
  );

  const summaryLabel = query.trim()
    ? `"${query}" 검색 결과 ${filteredRecommendations.length}건`
    : `전체 추천 결과 ${filteredRecommendations.length}건`;

  return (
    <section className="grid gap-4">
      <SectionCard
        title="추천 검색"
        description="군, 특기명, 전공 적합도, 자격증, 상태 배지, 추천 사유까지 함께 검색합니다."
        right={<TrustBadge label={summaryLabel} tone="info" />}>
        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400"
            placeholder="예: 카투사, 정보통신, 전기, 공군, 자격증"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {quickQueries.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  query === item
                    ? 'bg-[var(--navy)] text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}>
                {item}
              </button>
            ))}
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                검색 초기화
              </button>
            ) : null}
          </div>
        </div>
      </SectionCard>

      {filteredRecommendations.length === 0 ? (
        <SectionCard
          title="검색 결과 없음"
          description="다른 특기명, 군 이름, 자격증 이름, 상태 문구로 다시 검색해 보세요."
          right={<StatusBadge status="default">0건</StatusBadge>}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            예시 검색어: 카투사, 정보통신, 전기기능사, 공군, 현재 지원 불가
          </div>
        </SectionCard>
      ) : null}

      {filteredRecommendations.map((result) => (
        <SectionCard
          key={result.specialtyId}
          title={`${result.branch} · ${result.specialtyName}`}
          description={result.nextAction}
          right={<StatusBadge status={result.status}>{result.statusLabel}</StatusBadge>}>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="grid gap-2 md:grid-cols-2">
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  전공 적합 여부: {result.majorFit}
                </p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  자격증 적합 여부: {result.certificateFit}
                </p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  신체조건 충족 여부: {result.physicalFit}
                </p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  다음 모집 일정: {result.nextRecruitmentLabel}
                </p>
              </div>
              <ul className="space-y-2">
                {result.reasons.map((reason) => (
                  <li
                    key={reason}
                    className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  신뢰도
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.sources.map((source) => (
                    <TrustBadge key={source.label} label={source.label} tone={source.tone} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  다음 행동
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{result.nextAction}</p>
                <Link
                  href={`/specialty/${result.specialtyId}`}
                  className="mt-4 inline-flex rounded-2xl bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white">
                  특기 상세 보기
                </Link>
              </div>
            </div>
          </div>
        </SectionCard>
      ))}
    </section>
  );
}
