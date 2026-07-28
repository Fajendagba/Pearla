'use client';
import { useState } from 'react';

export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} — Pearla`, url });
        return;
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* clipboard unavailable */ }
    }
  };

  return (
    <div className="share-bar">
      <button type="button" className="share-btn" onClick={() => window.print()}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print recipe
      </button>
      <button type="button" className="share-btn" onClick={share}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
        {copied ? 'Link copied!' : 'Share'}
      </button>
    </div>
  );
}
