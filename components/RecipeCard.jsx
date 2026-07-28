import Link from 'next/link';
import Image from 'next/image';

const difficultyClass = { Easy: 'difficulty-easy', Medium: 'difficulty-medium', Hard: 'difficulty-hard' };

export default function RecipeCard({ recipe }) {
  const { slug, title, shortDesc, categoryLabel, emoji, gradient, image, imageAlt, totalTime, servings, difficulty } = recipe;

  return (
    <Link href={`/recipes/${slug}`} className="recipe-card">
      <div className="recipe-card-image" style={{ background: gradient }}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            className="recipe-card-photo"
          />
        ) : (
          <span aria-hidden="true">{emoji}</span>
        )}
        <span className="category-badge">{categoryLabel}</span>
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
