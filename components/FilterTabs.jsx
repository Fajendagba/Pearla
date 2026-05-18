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
];

export default function FilterTabs({ recipes }) {
  const [active, setActive] = useState('all');

  const visible = active === 'all' ? recipes : recipes.filter((r) => r.category === active);

  return (
    <>
      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${active === f.key ? ' active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="recipes-grid">
        {visible.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
