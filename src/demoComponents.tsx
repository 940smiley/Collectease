import type { ReactNode } from 'react';
import type { Collectible } from './demoData';

export function StatusPill({ status }: { status: Collectible['status'] }) {
  const tone: Record<Collectible['status'], { background: string; color: string }> = {
    Cataloged: { background: '#e9efe4', color: '#2f5c3a' },
    'Needs photos': { background: '#fff1d6', color: '#80520d' },
    'Ready to list': { background: '#dff4ef', color: '#146153' },
    Shared: { background: '#e5e8f6', color: '#303c7c' },
  };

  return (
    <span className="status-pill" style={tone[status]}>
      {status}
    </span>
  );
}

export function SectionShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="section-shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
