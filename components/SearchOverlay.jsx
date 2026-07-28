'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { recipes, getFeaturedRecipes } from '@/data/recipes';

const RECENT_SEARCHES_KEY = 'pearla-recent-searches';

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    try {
      setRecentSearches(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? '[]'));
    } catch { /* localStorage unavailable */ }
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const saveSearch = (term) => {
    const clean = term.trim();
    if (!clean) return;
    try {
      const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch { /* localStorage unavailable */ }
  };

  const q = query.trim().toLowerCase();
  const results = q
    ? recipes.filter((r) =>
        [r.title, r.shortDesc, r.categoryLabel].some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const popular = getFeaturedRecipes();

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search recipes">
        <div className="search-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search jollof, soup, plantain…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
          />
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">✕</button>
        </div>

        {q === '' ? (
          <div className="search-suggestions">
            {recentSearches.length > 0 && (
              <>
                <p className="search-heading">What you looked for before</p>
                <div className="search-chips">
                  {recentSearches.map((s) => (
                    <button key={s} type="button" className="search-chip" onClick={() => setQuery(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className="search-heading">What people cook the most</p>
            <ul className="search-results">
              {popular.map((r) => (
                <li key={r.slug}>
                  <Link href={`/recipes/${r.slug}`} className="search-result" onClick={onClose}>
                    <span className="search-thumb">
                      <Image src={r.image} alt="" width={52} height={52} />
                    </span>
                    <span className="search-result-text">
                      <strong>{r.title}</strong>
                      <span>{r.categoryLabel} · {r.totalTime} · {r.difficulty}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length > 0 ? (
          <ul className="search-results">
            {results.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="search-result"
                  onClick={() => { saveSearch(query); onClose(); }}
                >
                  <span className="search-thumb">
                    <Image src={r.image} alt="" width={52} height={52} />
                  </span>
                  <span className="search-result-text">
                    <strong>{r.title}</strong>
                    <span>{r.categoryLabel} · {r.totalTime} · {r.difficulty}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-empty">
            <p><strong>We found nothing for “{query}”</strong></p>
            <p>Try “rice”, “soup”, “grill” or “snack”. Or just look through everything we have.</p>
            <Link href="/recipes" className="btn btn-outline" onClick={onClose}>See all recipes</Link>
          </div>
        )}
      </div>
    </div>
  );
}
