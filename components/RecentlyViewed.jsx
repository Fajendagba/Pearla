'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { recipes } from '@/data/recipes';

const RECENT_KEY = 'pearla-recently-viewed';

export default function RecentlyViewed() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      const slugs = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
      const found = slugs
        .map((slug) => recipes.find((r) => r.slug === slug))
        .filter(Boolean)
        .slice(0, 4);
      setRecent(found);
    } catch { /* localStorage unavailable */ }
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="recently-viewed" aria-label="Recently viewed recipes">
      <div className="container">
        <div className="recently-viewed-header">
          <h2 className="recently-viewed-title">Welcome back — pick up where you left off</h2>
        </div>
        <div className="recently-viewed-row">
          {recent.map((r) => (
            <Link key={r.slug} href={`/recipes/${r.slug}`} className="recent-card">
              <span className="recent-card-thumb">
                <Image src={r.image} alt="" width={64} height={64} />
              </span>
              <span className="recent-card-text">
                <strong>{r.title}</strong>
                <span>{r.totalTime} · {r.difficulty}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
