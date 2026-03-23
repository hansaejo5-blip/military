'use client';

import { useState } from 'react';

import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { certificateExams, currentUserProfile, specialties } from '@/data/mock-data';
import { calculateSpecialtyDeadline, getEligibleSpecialties, getKatusaRecommendation } from '@/lib/recommendation';
import type { Branch, PriorityType, UserProfile } from '@/types/planner';

const branchOptions: Branch[] = ['육군', '해군', '공군', '카투사'];
const priorityOptions: PriorityType[] = ['빨리 입대', '전공 활용', '자격증 활용', '카투사 우선', '공군/해군 선호', '준비 부담 최소화'];

export function PlannerWorkspace() {
  const [profile, setProfile] = useState<UserProfile>(currentUserProfile);

  const recommendations = getEligibleSpecialties(profile);
  const katusa = getKatusaRecommendation(profile);
  const firstSpecialty = recommendations[0];
  const deadline = firstSpecialty
    ? calculateSpecialtyDeadline(
        firstSpecialty.specialtyId,
        specialties.find((item) => item.specialtyId === firstSpecialty.specialtyId)?.recommendedCertificates[0]
      )
    : null;

  function toggleBranch(branch: Branch) {
    setProfile((current) => ({
      ...current,
      preferredBranches: current.preferredBranches.includes(branch)
        ? current.preferredBranches.filter((item) => item !== branch)
        : [...current.preferredBranches, branch],
    }));
  }

  function togglePriority(priority: PriorityType) {
    setProfile((current) => ({
      ...current,
      priorities: current.priorities.includes(priority)
        ? current.priorities.filter((item) => item !== priority)
        : [...current.priorities, priority],
    }));
  }

  return (
    <div className="grid gap-6">
      <SectionCard
        title="사용자 정보 입력"
        description="온보딩과 마이페이지에서 같은 형태로 수정 가능한 구조입니다."
        right={<TrustBadge label="Firestore 저장 대상" tone="info" />}>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">출생연도</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" value={profile.birthYear} onChange={(event) => setProfile({ ...profile, birthYear: Number(event.target.value) })} />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">전공명</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={profile.major} onChange={(event) => setProfile({ ...profile, major: event.target.value })} />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">희망 입영월</span>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={profile.preferredEnlistmentMonths.join(', ')}
              onChange={(event) => setProfile({ ...profile, preferredEnlistmentMonths: event.target.value.split(',').map((item) => item.trim()) })}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">보유 자격증</span>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={profile.certificates.join(', ')}
              onChange={(event) => setProfile({ ...profile, certificates: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">TOEIC 점수</span>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              type="number"
              value={profile.languageScores.find((item) => item.examType === 'TOEIC')?.score ?? ''}
              onChange={(event) => {
                const score = Number(event.target.value);
                const rest = profile.languageScores.filter((item) => item.examType !== 'TOEIC');
                setProfile({ ...profile, languageScores: score ? [...rest, { examType: 'TOEIC', score, acquiredAt: '2026-03-24' }] : rest });
              }}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">신체등급</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" value={profile.physicalGrade} onChange={(event) => setProfile({ ...profile, physicalGrade: Number(event.target.value) })} />
          </label>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm font-semibold text-slate-800">희망 군</p>
          <div className="flex flex-wrap gap-2">
            {branchOptions.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => toggleBranch(branch)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${profile.preferredBranches.includes(branch) ? 'bg-[var(--navy)] text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>
                {branch}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm font-semibold text-slate-800">우선순위</p>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => togglePriority(priority)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${profile.priorities.includes(priority) ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>
                {priority}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="추천 엔진 결과" description="지금 지원 가능, 1개 추가 시 가능, 현재 불가를 계산합니다." right={<TrustBadge label="계산 추정치 + 공식 소스 분리" tone="info" />}>
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {recommendations.map((result) => (
              <div key={result.specialtyId} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{result.specialtyName}</p>
                    <p className="text-sm text-slate-500">{result.branch}</p>
                  </div>
                  <StatusBadge status={result.status}>{result.statusLabel}</StatusBadge>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  <p>전공 적합 여부: {result.majorFit}</p>
                  <p>자격증 적합 여부: {result.certificateFit}</p>
                  <p>신체조건 충족 여부: {result.physicalFit}</p>
                  <p>다음 모집 일정: {result.nextRecruitmentLabel}</p>
                  <p>다음 행동: {result.nextAction}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">카투사 추천</p>
                <StatusBadge status={katusa.needed ? 'warning' : 'success'}>{katusa.needed ? '준비 필요' : '기준 충족'}</StatusBadge>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">{katusa.headline}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {katusa.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="font-semibold text-slate-900">카투사 기준으로 가능한 TOEIC 회차</p>
              <div className="mt-3 space-y-3">
                {katusa.examOptions.map((exam) => (
                  <div key={exam.examId} className="rounded-2xl border border-white bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{exam.examDate}</p>
                      <StatusBadge status={exam.feasibility === '안전' ? 'success' : exam.feasibility === '촉박' ? 'warning' : 'danger'}>{exam.feasibility}</StatusBadge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">발표일 {exam.resultDate} · 응시료 {exam.examFee.toLocaleString('ko-KR')}원</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="자격증 / 어학시험 역산기" description="접수 마감, 발표 완료, 발급 여유일까지 포함한 권장 마감일을 계산합니다." right={<TrustBadge label="계산 추정치" tone="warning" />}>
        {deadline ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {Object.entries(deadline).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">계산 가능한 다음 모집 회차가 없습니다.</p>
        )}
      </SectionCard>

      <SectionCard title="시험 일정 / 응시료 데이터 구조" description="일정, 점수 기준, 응시료는 컬렉션으로 관리하고 화면은 그 데이터를 읽습니다." right={<TrustBadge label="공식 시험기관 기반" tone="success" />}>
        <div className="grid gap-3 lg:grid-cols-2">
          {certificateExams.map((exam) => (
            <div key={exam.examId} className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{exam.examName}</p>
              <p className="mt-1 text-slate-500">{exam.provider}</p>
              <p className="mt-3">시험일 {exam.examDate}</p>
              <p>성적 발표일 {exam.resultDate}</p>
              <p>응시료 {exam.examFee.toLocaleString('ko-KR')}원</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
