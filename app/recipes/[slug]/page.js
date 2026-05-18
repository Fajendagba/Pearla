import { notFound } from 'next/navigation';
import Link from 'next/link';
import { recipes, getRecipeBySlug, getRelatedRecipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: 'Recipe Not Found' };
  return { title: recipe.title };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getRelatedRecipes(recipe.related);

  return (
    <>
      {/* RECIPE HERO */}
      <section className="recipe-hero">
        <div className="container">
          <div className="recipe-hero-inner">
            <div>
              <nav className="recipe-breadcrumb">
                <Link href="/">Home</Link> ›{' '}
                <Link href="/recipes">Recipes</Link> ›{' '}
                {recipe.title}
              </nav>
              <h1 className="recipe-detail-title">{recipe.title}</h1>
              <p className="recipe-detail-desc">{recipe.fullDesc}</p>
              <div className="recipe-detail-meta">
                <div className="meta-badge">
                  <span className="meta-badge-icon">⏱</span>
                  <span className="meta-badge-value">{recipe.prepTime}</span>
                  <span className="meta-badge-label">Prep Time</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon">🔥</span>
                  <span className="meta-badge-value">{recipe.cookTime}</span>
                  <span className="meta-badge-label">Cook Time</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon">👤</span>
                  <span className="meta-badge-value">{recipe.servings}</span>
                  <span className="meta-badge-label">Servings</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon">📊</span>
                  <span className="meta-badge-value">{recipe.difficulty}</span>
                  <span className="meta-badge-label">Difficulty</span>
                </div>
              </div>
            </div>
            <div>
              <div className="recipe-plate-large">{recipe.emoji}</div>
            </div>
          </div>
        </div>
      </section>

      {/* RECIPE BODY */}
      <section className="recipe-body">
        <div className="container">
          <div className="recipe-body-inner">

            {/* INGREDIENTS SIDEBAR */}
            <aside className="ingredients-card">
              <h3 className="ingredients-card-title">Ingredients</h3>
              <p className="ingredients-servings">Serves {recipe.servings} people</p>
              {recipe.ingredients.map((group) => (
                <div key={group.group} className="ingredients-group">
                  <div className="ingredients-group-title">{group.group}</div>
                  <ul className="ingredients-list">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <span className="ingredient-amount">{item.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            {/* INSTRUCTIONS */}
            <div className="instructions-section">
              <h3>How to Make {recipe.title}</h3>
              {recipe.steps.map((step, i) => (
                <div key={i} className="step">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}

              <div className="tips-section">
                <h4>Chef&apos;s Tips</h4>
                <ul className="tips-list">
                  {recipe.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED RECIPES */}
      {related.length > 0 && (
        <section className="related-recipes">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Goes Great With</h2>
              <p className="section-subtitle">Complete your plate</p>
            </div>
            <div className="recipes-grid">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
