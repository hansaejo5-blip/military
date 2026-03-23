import type { ReactNode } from 'react';

export function StatusBadge({
  status,
  children,
}: {
  status: 'success' | 'warning' | 'danger' | 'default';
  children: ReactNode;
}) {
  const styles = {
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
    default: 'bg-slate-100 text-slate-700',
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{children}</span>;
}
