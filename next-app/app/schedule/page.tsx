import { SectionCard } from '@/components/section-card';
import { StatusBadge } from '@/components/status-badge';
import { TrustBadge } from '@/components/trust-badge';
import { certificateExams, recruitNotices, today } from '@/data/mock-data';
import { daysUntil, formatDateLabel } from '@/lib/date';

export default function SchedulePage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <TrustBadge label="공식 일정 + 계산 추정치 분리" tone="info" />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">일정</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">모집 시작, 마감, 발표, 서류 제출, 시험 일정, 응시료를 함께 보고 최신 공식 데이터가 없는 경우에는 추정 배지를 붙입니다.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="모집 일정" description="마감 임박과 추가모집을 먼저 확인합니다.">
          <div className="space-y-3">
            {recruitNotices.map((notice) => (
              <div key={notice.noticeId} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{notice.title}</p>
                  <StatusBadge status={notice.isAdditionalRecruitment || notice.isFirstComeFirstServed ? 'warning' : 'default'}>
                    {notice.isAdditionalRecruitment ? '추가모집' : notice.isFirstComeFirstServed ? '선착순 감시' : '정기 모집'}
                  </StatusBadge>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <p>접수 시작: {formatDateLabel(notice.applyStartAt)}</p>
                  <p>접수 마감: {formatDateLabel(notice.applyEndAt)}</p>
                  <p>서류 마감: {formatDateLabel(notice.documentDeadlineAt)}</p>
                  <p>오늘 기준: {daysUntil(today, notice.applyEndAt)}일 남음</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="시험 일정 / 응시료" description="TOEIC과 국가기술자격 구조를 공통 컬렉션으로 관리합니다.">
          <div className="space-y-3">
            {certificateExams.map((exam) => (
              <div key={exam.examId} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{exam.examName}</p>
                    <p className="text-sm text-slate-500">{exam.provider}</p>
                  </div>
                  <TrustBadge label={exam.sourceLabel} tone={exam.sourceTone} />
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  <p>시험일: {formatDateLabel(exam.examDate)}</p>
                  <p>발표일: {formatDateLabel(exam.resultDate)}</p>
                  <p>발급 가능일: {formatDateLabel(exam.issueAvailableDate)}</p>
                  <p>응시료: {exam.examFee.toLocaleString('ko-KR')}원</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
