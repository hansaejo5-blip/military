const DAY = 1000 * 60 * 60 * 24;

export function formatDateLabel(date: string) {
  const parsed = new Date(date);
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

export function daysUntil(today: string, target: string) {
  const diff = new Date(target).getTime() - new Date(today).getTime();
  return Math.ceil(diff / DAY);
}

export function subtractDays(date: string, days: number) {
  const parsed = new Date(date);
  parsed.setDate(parsed.getDate() - days);
  return formatDateLabel(parsed.toISOString());
}

export function calculateSafeExamDeadline(
  recruitmentEndDate: string,
  examResultDate: string,
  issueAvailableDate: string
) {
  const 인정기준일 = formatDateLabel(recruitmentEndDate);
  const 발표완료마감 = formatDateLabel(examResultDate);
  const 발급여유마감 = formatDateLabel(issueAvailableDate);
  const 권장시험응시마감 = subtractDays(recruitmentEndDate, 21);

  const diff = new Date(recruitmentEndDate).getTime() - new Date(issueAvailableDate).getTime();
  const 위험도: '안전' | '촉박' | '현실적으로 어려움' =
    diff >= DAY * 14 ? '안전' : diff >= DAY * 5 ? '촉박' : '현실적으로 어려움';

  return {
    인정기준일,
    권장시험응시마감,
    발표완료마감,
    발급여유마감,
    위험도,
  };
}
