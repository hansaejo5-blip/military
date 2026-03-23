import type { ReactNode } from 'react';

export function SectionCard({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          {description ? <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}
