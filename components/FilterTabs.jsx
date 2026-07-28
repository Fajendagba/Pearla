'use client';
import { useState } from 'react';
import RecipeCard from './RecipeCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'rice', label: 'Rice Dishes' },
  { key: 'soups', label: 'Soups & Stews' },
  { key: 'grill', label: 'Grills & BBQ' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'sides', label: 'Sides' },
  { key: 'swallows', label: 'Swallows' },
  { key: 'sweets', label: 'Sweets' },
];

export default function FilterTabs({ recipes, initialCategory, syncUrl = false }) {
  const validInitial = FILTERS.some((f) => f.key === initialCategory) ? initialCategory : 'all';
  const [active, setActive] = useState(validInitial);

  const countFor = (key) =>
    key === 'all' ? recipes.length : recipes.filter((r) => r.category === key).length;

  const select = (key) => {
    setActive(key);
    if (syncUrl && typeof window !== 'undefined') {
      const url = key === 'all' ? '/recipes' : `/recipes?category=${key}`;
      window.history.replaceState(null, '', url);
    }
  };

  const visible = active === 'all' ? recipes : recipes.filter((r) => r.category === active);
  const activeLabel = FILTERS.find((f) => f.key === active)?.label ?? 'All';

  return (
    <>
      <div className="filter-tabs" role="group" aria-label="Filter recipes by category">
        {FILTERS.map((f) => {
          const count = countFor(f.key);
          return (
            <button
              key={f.key}
              className={`filter-btn${active === f.key ? ' active' : ''}`}
              onClick={() => select(f.key)}
              aria-pressed={active === f.key}
            >
              {f.label} <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      {visible.length > 0 ? (
        <div className="recipes-grid">
          {visible.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-title">Nothing here yet</p>
          <p className="empty-state-desc">
            We have not added any {activeLabel} recipes so far. Come back later, or have a look
            at everything else.
          </p>
          <button className="btn btn-outline" onClick={() => select('all')}>
            Show me everything
          </button>
        </div>
      )}
    </>
  );
}
