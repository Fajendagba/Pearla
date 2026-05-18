import Link from 'next/link';

const difficultyClass = { Easy: 'difficulty-easy', Medium: 'difficulty-medium', Hard: 'difficulty-hard' };

export default function RecipeCard({ recipe }) {
  const { slug, title, shortDesc, category, categoryLabel, emoji, gradient, totalTime, servings, difficulty } = recipe;

  return (
    <Link href={`/recipes/${slug}`} className="recipe-card">
      <div className="recipe-card-image" style={{ background: gradient }}>
        <span className="category-badge">{categoryLabel}</span>
        {emoji}
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{title}</h3>
        <p className="recipe-card-desc">{shortDesc}</p>
        <div className="recipe-meta">
          <span className="recipe-meta-item">⏱ {totalTime}</span>
          <span className="recipe-meta-item">👤 {servings} servings</span>
          <span className={`difficulty ${difficultyClass[difficulty] ?? 'difficulty-easy'}`}>
            {difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
